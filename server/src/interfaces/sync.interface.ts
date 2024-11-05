import { AlbumEntity } from 'src/entities/album.entity';
import { AssetEntity } from 'src/entities/asset.entity';
import { SessionEntity } from 'src/entities/session.entity';
import { SyncCheckpointEntity } from 'src/entities/sync-checkpoint.entity';
import { Paginated, PaginationOptions } from 'src/utils/pagination';

export const ISyncRepository = 'ISyncRepository';

export type SyncOptions = PaginationOptions & {
  userId: string;
  lastCheckpointTimestamp?: string;
};

export type AssetPartnerSyncOptions = SyncOptions & { partnerIds: string[] };

export type EntityPK = { id: string };
export type DeletedEntity<T = EntityPK> = T & {
  deletedAt: Date;
};
export type AlbumAssetPK = {
  albumId: string;
  assetId: string;
};

export type AlbumAssetEntity = AlbumAssetPK & {
  createdAt: Date;
};

export interface ISyncRepository {
  get(sessionId: string): Promise<SessionEntity | null>;
  upsertCheckpoint(checkpoint: Partial<SyncCheckpointEntity>): Promise<void>;

  getAssets(options: SyncOptions): Paginated<AssetEntity>;
  getDeletedAssets(options: SyncOptions): Paginated<DeletedEntity>;

  getAssetsPartner(options: AssetPartnerSyncOptions): Paginated<AssetEntity>;
  getDeletedAssetsPartner(options: AssetPartnerSyncOptions): Paginated<DeletedEntity>;

  getAlbums(options: SyncOptions): Paginated<AlbumEntity>;
  getDeletedAlbums(options: SyncOptions): Paginated<DeletedEntity>;

  getAlbumAssets(options: SyncOptions): Paginated<AlbumAssetEntity>;
  getDeletedAlbumAssets(options: SyncOptions): Paginated<DeletedEntity<AlbumAssetPK>>;
}
