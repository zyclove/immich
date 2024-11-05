import { ForbiddenException } from '@nestjs/common';
import { DateTime } from 'luxon';
import { Writable } from 'node:stream';
import { AUDIT_LOG_MAX_DURATION } from 'src/constants';
import { AlbumResponseDto, mapAlbumWithoutAssets } from 'src/dtos/album.dto';
import { AssetResponseDto, mapAsset } from 'src/dtos/asset-response.dto';
import { AuthDto } from 'src/dtos/auth.dto';
import {
  AssetDeltaSyncDto,
  AssetDeltaSyncResponseDto,
  AssetFullSyncDto,
  SyncAcknowledgeDto,
  SyncAlbumAssetDeleteDtoV1,
  SyncAlbumAssetDtoV1,
  SyncAlbumDeleteV1,
  SyncAssetOwnerDeleteV1,
  SyncAssetOwnerDtoV1,
  SyncAssetPartnerDeleteV1,
  SyncCommonAssetDtoV1,
  SyncCommonDeleteDtoV1,
  SyncStreamDto,
} from 'src/dtos/sync.dto';
import { AlbumEntity } from 'src/entities/album.entity';
import { AssetEntity } from 'src/entities/asset.entity';
import { SyncCheckpointEntity } from 'src/entities/sync-checkpoint.entity';
import { DatabaseAction, EntityType, Permission, SyncAcknowledgeType, SyncResponseType } from 'src/enum';
import { AlbumAssetEntity, AlbumAssetPK, DeletedEntity, SyncOptions } from 'src/interfaces/sync.interface';
import { BaseService } from 'src/services/base.service';
import { getMyPartnerIds } from 'src/utils/asset.util';
import { Paginated, usePagination } from 'src/utils/pagination';
import { setIsEqual } from 'src/utils/set';

const FULL_SYNC = { needsFullSync: true, deleted: [], upserted: [] };
const SYNC_PAGE_SIZE = 5000;

const createdAt = (item: { createdAt: Date }) => item.createdAt.toISOString();
const updatedAt = (item: { updatedAt: Date }) => item.updatedAt.toISOString();
const deletedAt = (item: { deletedAt: Date }) => item.deletedAt.toISOString();

const mapJsonLine = (item: unknown) => JSON.stringify(item) + '\n';

const v1 = {
  mapDeletedDto: (item: DeletedEntity): SyncCommonDeleteDtoV1 => ({
    id: item.id,
    deletedAt: item.deletedAt.toISOString(),
  }),
  mapAsset: (item: AssetEntity): SyncCommonAssetDtoV1 => ({
    id: item.id,
    ownerId: item.ownerId,
    libraryId: item.libraryId ?? undefined,
    livePhotoVideoId: item.livePhotoVideoId ?? undefined,

    createdAt: item.createdAt.toISOString(),
    deletedAt: item.deletedAt?.toISOString(),
    fileCreatedAt: item.fileCreatedAt.toISOString(),
    fileModifiedAt: item.fileModifiedAt.toISOString(),

    isFavorite: item.isFavorite,
    isArchived: item.isArchived,
    isExternal: item.isExternal,
    isOffline: item.isOffline,

    type: item.type,
    status: item.status,

    thumbhash: item.thumbhash?.toString('base64'),
    originalPath: item.originalPath,
    originalFileName: item.originalFileName,
    checksum: item.checksum.toString('base64'),
    duration: item.duration ?? '0:00:00.00000',

    exifImageWidth: item.exifInfo?.exifImageWidth ?? undefined,
    exifImageHeight: item.exifInfo?.exifImageHeight ?? undefined,
    fileSizeInByte: item.exifInfo?.fileSizeInByte ?? undefined,
    orientation: item.exifInfo?.orientation ?? undefined,

    dateTimeOriginal: item.exifInfo?.dateTimeOriginal?.toISOString(),
    modifyDate: item.exifInfo?.modifyDate?.toISOString(),
    latitude: item.exifInfo?.latitude ?? undefined,
    longitude: item.exifInfo?.longitude ?? undefined,
    projectionType: item.exifInfo?.projectionType ?? undefined,
    city: item.exifInfo?.city ?? undefined,
    state: item.exifInfo?.state ?? undefined,
    country: item.exifInfo?.country ?? undefined,
    make: item.exifInfo?.make ?? undefined,
    model: item.exifInfo?.model ?? undefined,
    lensModel: item.exifInfo?.lensModel ?? undefined,
    fNumber: item.exifInfo?.fNumber ?? undefined,
    iso: item.exifInfo?.iso ?? undefined,
    exposureTime: item.exifInfo?.exposureTime ?? undefined,
    profileDescription: item.exifInfo?.profileDescription ?? undefined,
    colorspace: item.exifInfo?.colorspace ?? undefined,
    bitsPerSample: item.exifInfo?.bitsPerSample ?? undefined,
    rating: item.exifInfo?.rating ?? undefined,
    fps: item.exifInfo?.fps ?? undefined,
  }),
  mapAlbumAsset: (item: AlbumAssetEntity) => ({
    assetId: item.assetId,
    albumId: item.albumId,
    createdAt: createdAt(item),
  }),
  mapAlbumAssetDeleted: (item: DeletedEntity<AlbumAssetPK>) => ({
    assetId: item.assetId,
    albumId: item.albumId,
    deletedAt: deletedAt(item),
  }),
};

type CheckpointMap = Partial<Record<SyncAcknowledgeType, SyncCheckpointEntity>>;
type Loader<T> = (options: SyncOptions) => Paginated<T>;
type Mapper<T, R> = (item: T) => R;
type SyncResponseWriteArgs<T, R> = {
  type: SyncResponseType;
  load: Loader<T>;
  map: Mapper<T, R>;
  timestamp: Mapper<T, string>;
};

const ackTypes: Record<SyncResponseType, SyncAcknowledgeType> = {
  [SyncResponseType.ActivityV1]: SyncAcknowledgeType.Activity,
  [SyncResponseType.ActivityDeleteV1]: SyncAcknowledgeType.ActivityDelete,

  [SyncResponseType.AssetOwnerV1]: SyncAcknowledgeType.AssetOwner,
  [SyncResponseType.AssetOwnerDeleteV1]: SyncAcknowledgeType.AssetOwnerDelete,

  [SyncResponseType.AssetPartnerV1]: SyncAcknowledgeType.AssetPartner,
  [SyncResponseType.AssetPartnerDeleteV1]: SyncAcknowledgeType.AssetPartnerDelete,

  [SyncResponseType.AssetAlbumV1]: SyncAcknowledgeType.AssetAlbum,
  [SyncResponseType.AssetAlbumDeleteV1]: SyncAcknowledgeType.AssetAlbumDelete,

  [SyncResponseType.AlbumV1]: SyncAcknowledgeType.Album,
  [SyncResponseType.AlbumDeleteV1]: SyncAcknowledgeType.AlbumDelete,

  [SyncResponseType.MemoryV1]: SyncAcknowledgeType.Memory,
  [SyncResponseType.MemoryDeleteV1]: SyncAcknowledgeType.MemoryDelete,

  [SyncResponseType.PartnerV1]: SyncAcknowledgeType.Partner,
  [SyncResponseType.PartnerDeleteV1]: SyncAcknowledgeType.PartnerDelete,

  [SyncResponseType.PersonV1]: SyncAcknowledgeType.Person,
  [SyncResponseType.PersonDeleteV1]: SyncAcknowledgeType.PersonDelete,

  [SyncResponseType.SharedLinkV1]: SyncAcknowledgeType.SharedLink,
  [SyncResponseType.SharedLinkDeleteV1]: SyncAcknowledgeType.SharedLinkDelete,

  [SyncResponseType.StackV1]: SyncAcknowledgeType.Stack,
  [SyncResponseType.StackDeleteV1]: SyncAcknowledgeType.StackDelete,

  [SyncResponseType.TagV1]: SyncAcknowledgeType.Tag,
  [SyncResponseType.TagDeleteV1]: SyncAcknowledgeType.TagDelete,

  [SyncResponseType.UserV1]: SyncAcknowledgeType.User,
  [SyncResponseType.UserDeleteV1]: SyncAcknowledgeType.UserDelete,

  // relation types
  [SyncResponseType.AlbumAssetV1]: SyncAcknowledgeType.AlbumAsset,
  [SyncResponseType.AlbumAssetDeleteV1]: SyncAcknowledgeType.AlbumAssetDelete,

  [SyncResponseType.AlbumUserV1]: SyncAcknowledgeType.AlbumUser,
  [SyncResponseType.AlbumUserDeleteV1]: SyncAcknowledgeType.AlbumUserDelete,
};

const asAcknowledgeType = (type: SyncResponseType) => ackTypes[type];

class SyncResponseWriter<T = any, R = any> {
  private checkpoints?: CheckpointMap;

  constructor(private args: SyncResponseWriteArgs<T, R>) {}

  async write({ stream, userId }: { stream: Writable; userId: string }) {
    const { type: responseType, load, map, timestamp: getTimestamp } = this.args;
    const acknowledgeType = asAcknowledgeType(responseType);
    let lastCheckpointTimestamp = this.getLastTimestamp(acknowledgeType);

    const pagination = usePagination(SYNC_PAGE_SIZE, (options) =>
      load({ ...options, userId, lastCheckpointTimestamp }),
    );

    for await (const items of pagination) {
      for (const item of items) {
        const timestamp = getTimestamp(item);
        const ack = timestamp === lastCheckpointTimestamp ? undefined : { timestamp, type: responseType };
        stream.write(mapJsonLine({ type: responseType, data: map(item) || (item as unknown as R), ack }));
        lastCheckpointTimestamp = timestamp;
      }
    }
  }

  withCheckpoints(checkpoints: CheckpointMap) {
    this.checkpoints = checkpoints;
    return this;
  }

  private getLastTimestamp(type: SyncAcknowledgeType) {
    if (!this.checkpoints) {
      throw new Error('checkpoints not set');
    }

    return this.checkpoints[type]?.lastTimestamp;
  }
}

export class SyncService extends BaseService {
  async acknowledge(auth: AuthDto, dto: SyncAcknowledgeDto) {
    const { id: sessionId } = this.assertSession(auth);
    await this.syncRepository.upsertCheckpoint({
      sessionId,
      type: dto.type,
      lastTimestamp: dto.timestamp,
    });
  }

  async stream(auth: AuthDto, stream: Writable, dto: SyncStreamDto) {
    const { id: sessionId, userId } = this.assertSession(auth);
    const session = await this.syncRepository.get(sessionId);
    const checkpoints: CheckpointMap = Object.fromEntries(
      (session?.checkpoints ?? []).map((item) => [item.type, item]),
    );

    const streamers: SyncResponseWriter[] = [];

    for (const type of dto.types) {
      switch (type) {
        case SyncResponseType.AssetOwnerV1: {
          streamers.push(
            new SyncResponseWriter<AssetEntity, SyncAssetOwnerDtoV1>({
              type: SyncResponseType.AssetOwnerV1,
              load: (options) => this.syncRepository.getAssets(options),
              map: (item) => v1.mapAsset(item),
              timestamp: updatedAt,
            }),
          );
          break;
        }

        case SyncResponseType.AssetOwnerDeleteV1: {
          streamers.push(
            new SyncResponseWriter<DeletedEntity, SyncAssetOwnerDeleteV1>({
              type: SyncResponseType.AssetOwnerDeleteV1,
              load: (options) => this.syncRepository.getDeletedAssets(options),
              map: v1.mapDeletedDto,
              timestamp: deletedAt,
            }),
          );
          break;
        }

        case SyncResponseType.AssetPartnerV1: {
          const partnerIds = await getMyPartnerIds({ userId, repository: this.partnerRepository });
          streamers.push(
            new SyncResponseWriter<DeletedEntity, SyncAssetPartnerDeleteV1>({
              type: SyncResponseType.AssetPartnerV1,
              load: (options) => this.syncRepository.getDeletedAssetsPartner({ ...options, partnerIds }),
              map: v1.mapDeletedDto,
              timestamp: deletedAt,
            }),
          );
          break;
        }

        case SyncResponseType.AssetPartnerDeleteV1: {
          const partnerIds = await getMyPartnerIds({ userId, repository: this.partnerRepository });
          streamers.push(
            new SyncResponseWriter<AssetEntity, AssetResponseDto>({
              type: SyncResponseType.AssetPartnerDeleteV1,
              load: (options) => this.syncRepository.getAssetsPartner({ ...options, partnerIds }),
              map: (item) => mapAsset(item, { auth, stripMetadata: false }),
              timestamp: updatedAt,
            }),
          );
          break;
        }

        case SyncResponseType.AlbumV1: {
          streamers.push(
            new SyncResponseWriter<AlbumEntity, AlbumResponseDto>({
              type: SyncResponseType.AlbumV1,
              load: (options) => this.syncRepository.getAlbums(options),
              map: (item) => mapAlbumWithoutAssets(item),
              timestamp: updatedAt,
            }),
          );
          break;
        }

        case SyncResponseType.AlbumDeleteV1: {
          streamers.push(
            new SyncResponseWriter<DeletedEntity, SyncAlbumDeleteV1>({
              type: SyncResponseType.AlbumDeleteV1,
              load: (options) => this.syncRepository.getDeletedAlbums(options),
              map: v1.mapDeletedDto,
              timestamp: deletedAt,
            }),
          );
          break;
        }

        case SyncResponseType.AlbumAssetV1: {
          streamers.push(
            new SyncResponseWriter<AlbumAssetEntity, SyncAlbumAssetDtoV1>({
              type: SyncResponseType.AlbumAssetV1,
              load: (options) => this.syncRepository.getAlbumAssets(options),
              map: v1.mapAlbumAsset,
              timestamp: createdAt,
            }),
          );
        }

        case SyncResponseType.AlbumAssetDeleteV1: {
          streamers.push(
            new SyncResponseWriter<DeletedEntity<AlbumAssetPK>, SyncAlbumAssetDeleteDtoV1>({
              type: SyncResponseType.AlbumAssetDeleteV1,
              load: (options) => this.syncRepository.getDeletedAlbumAssets(options),
              map: v1.mapAlbumAssetDeleted,
              timestamp: deletedAt,
            }),
          );
        }

        default: {
          this.logger.warn(`Unsupported sync type: ${type}`);
          break;
        }
      }
    }

    for (const streamer of streamers) {
      await streamer.withCheckpoints(checkpoints).write({ stream, userId });
    }

    stream.end();
  }

  async getFullSync(auth: AuthDto, dto: AssetFullSyncDto): Promise<AssetResponseDto[]> {
    // mobile implementation is faster if this is a single id
    const userId = dto.userId || auth.user.id;
    await this.requireAccess({ auth, permission: Permission.TIMELINE_READ, ids: [userId] });
    const assets = await this.assetRepository.getAllForUserFullSync({
      ownerId: userId,
      updatedUntil: dto.updatedUntil,
      lastId: dto.lastId,
      limit: dto.limit,
    });
    return assets.map((a) => mapAsset(a, { auth, stripMetadata: false, withStack: true }));
  }

  async getDeltaSync(auth: AuthDto, dto: AssetDeltaSyncDto): Promise<AssetDeltaSyncResponseDto> {
    // app has not synced in the last 100 days
    const duration = DateTime.now().diff(DateTime.fromJSDate(dto.updatedAfter));
    if (duration > AUDIT_LOG_MAX_DURATION) {
      return FULL_SYNC;
    }

    // app does not have the correct partners synced
    const partnerIds = await getMyPartnerIds({ userId: auth.user.id, repository: this.partnerRepository });
    const userIds = [auth.user.id, ...partnerIds];
    if (!setIsEqual(new Set(userIds), new Set(dto.userIds))) {
      return FULL_SYNC;
    }

    await this.requireAccess({ auth, permission: Permission.TIMELINE_READ, ids: dto.userIds });

    const limit = 10_000;
    const upserted = await this.assetRepository.getChangedDeltaSync({ limit, updatedAfter: dto.updatedAfter, userIds });

    // too many changes, need to do a full sync
    if (upserted.length === limit) {
      return FULL_SYNC;
    }

    const deleted = await this.auditRepository.getAfter(dto.updatedAfter, {
      userIds,
      entityType: EntityType.ASSET,
      action: DatabaseAction.DELETE,
    });

    const result = {
      needsFullSync: false,
      upserted: upserted
        // do not return archived assets for partner users
        .filter((a) => a.ownerId === auth.user.id || (a.ownerId !== auth.user.id && !a.isArchived))
        .map((a) =>
          mapAsset(a, {
            auth,
            stripMetadata: false,
            // ignore stacks for non partner users
            withStack: a.ownerId === auth.user.id,
          }),
        ),
      deleted,
    };
    return result;
  }

  private assertSession(auth: AuthDto) {
    if (!auth.session?.id) {
      throw new ForbiddenException('This endpoint requires session-based authentication');
    }

    return auth.session;
  }
}
