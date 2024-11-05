import { ISyncRepository } from 'src/interfaces/sync.interface';
import { Mocked, vitest } from 'vitest';

export const newSyncRepositoryMock = (): Mocked<ISyncRepository> => {
  return {
    get: vitest.fn(),
    upsertCheckpoint: vitest.fn(),

    getAssets: vitest.fn(),
    getDeletedAssets: vitest.fn(),

    getAssetsPartner: vitest.fn(),
    getDeletedAssetsPartner: vitest.fn(),

    getAlbums: vitest.fn(),
    getDeletedAlbums: vitest.fn(),

    getAlbumAssets: vitest.fn(),
    getDeletedAlbumAssets: vitest.fn(),
  };
};
