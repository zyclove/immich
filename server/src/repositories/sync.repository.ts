import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from 'src/entities/album.entity';
import { AssetEntity } from 'src/entities/asset.entity';
import { SessionEntity } from 'src/entities/session.entity';
import { SyncCheckpointEntity } from 'src/entities/sync-checkpoint.entity';
import {
  AlbumAssetEntity,
  AlbumAssetPK,
  AssetPartnerSyncOptions,
  DeletedEntity,
  EntityPK,
  ISyncRepository,
  SyncOptions,
} from 'src/interfaces/sync.interface';
import { paginate, Paginated } from 'src/utils/pagination';
import { DataSource, FindOptionsWhere, In, MoreThan, Repository } from 'typeorm';

const withCheckpoint = <T>(where: FindOptionsWhere<T>, key: keyof T, lastCheckpointTimestamp?: string) => {
  return lastCheckpointTimestamp ? { ...where, [key]: MoreThan(lastCheckpointTimestamp) } : where;
};

@Injectable()
export class SyncRepository implements ISyncRepository {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(AssetEntity) private assetRepository: Repository<AssetEntity>,
    @InjectRepository(AlbumEntity) private albumRepository: Repository<AlbumEntity>,
    @InjectRepository(SyncCheckpointEntity) private checkpointRepository: Repository<SyncCheckpointEntity>,
    @InjectRepository(SessionEntity) private sessionRepository: Repository<SessionEntity>,
  ) {}

  get(sessionId: string): Promise<SessionEntity | null> {
    return this.sessionRepository.findOne({
      where: {
        id: sessionId,
      },
      relations: {
        checkpoints: true,
      },
    });
  }

  async upsertCheckpoint(checkpoint: Partial<SyncCheckpointEntity>): Promise<void> {
    await this.checkpointRepository.upsert(checkpoint, { conflictPaths: ['sessionId', 'type'] });
  }

  getAssets({
    lastCheckpointTimestamp: checkpoint,
    userId,
    ...options
  }: AssetPartnerSyncOptions): Paginated<AssetEntity> {
    return paginate(this.assetRepository, options, {
      where: withCheckpoint<AssetEntity>(
        {
          ownerId: userId,
          isVisible: true,
        },
        'updatedAt',
        checkpoint,
      ),
      relations: {
        exifInfo: true,
      },
      order: {
        updatedAt: 'ASC',
        id: 'ASC',
      },
    });
  }

  getDeletedAssets(): Paginated<DeletedEntity<EntityPK>> {
    return Promise.resolve({ items: [], hasNextPage: false });
  }

  getAssetsPartner({
    lastCheckpointTimestamp: checkpoint,
    partnerIds,
    ...options
  }: AssetPartnerSyncOptions): Paginated<AssetEntity> {
    return paginate(this.assetRepository, options, {
      where: withCheckpoint<AssetEntity>({ ownerId: In(partnerIds) }, 'updatedAt', checkpoint),
      order: {
        updatedAt: 'ASC',
        id: 'ASC',
      },
    });
  }

  getDeletedAssetsPartner(): Paginated<DeletedEntity<EntityPK>> {
    return Promise.resolve({ items: [], hasNextPage: false });
  }

  getAlbums({ lastCheckpointTimestamp: checkpoint, userId, ...options }: SyncOptions): Paginated<AlbumEntity> {
    return paginate(this.albumRepository, options, {
      where: withCheckpoint<AlbumEntity>({ ownerId: userId }, 'updatedAt', checkpoint),
      order: {
        updatedAt: 'ASC',
        id: 'ASC',
      },
    });
  }

  getDeletedAlbums(): Paginated<DeletedEntity<EntityPK>> {
    return Promise.resolve({ items: [], hasNextPage: false });
  }

  getAlbumAssets(): Paginated<AlbumAssetEntity> {
    return Promise.resolve({ items: [], hasNextPage: false });
  }

  getDeletedAlbumAssets(): Paginated<DeletedEntity<AlbumAssetPK>> {
    return Promise.resolve({ items: [], hasNextPage: false });
  }
}
