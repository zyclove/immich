import { Stats } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { AssetEntity } from 'src/entities/asset.entity';
import { AssetType } from 'src/enum';
import { IAssetRepository } from 'src/interfaces/asset.interface';
import { JobStatus } from 'src/interfaces/job.interface';
import { IStorageRepository } from 'src/interfaces/storage.interface';
import { MediaRepository } from 'src/repositories/media.repository';
import { MediaService } from 'src/services/media.service';
import { newLoggerRepositoryMock } from 'test/repositories/logger.repository.mock';
import { newTestService, testAssetDir } from 'test/utils';
import { Mocked } from 'vitest';

type ThumbnailTest = {
  input: {
    filePath: string;
    type: AssetType;
  };
};

describe(MediaService.name, () => {
  let sut: MediaService;

  let assetMock: Mocked<IAssetRepository>;
  let storageMock: Mocked<IStorageRepository>;

  beforeEach(async () => {
    const mediaRepository = new MediaRepository(newLoggerRepositoryMock());
    ({ sut, assetMock, storageMock } = newTestService(MediaService, { mediaRepository }));

    storageMock.stat.mockResolvedValue({ size: 123_456 } as Stats);

    const mediaLocation = join(tmpdir(), 'immich-medium-tests');
    process.env.IMMICH_MEDIA_LOCATION = mediaLocation;
    await mkdir(mediaLocation, { recursive: true });
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  describe('handleGenerateThumbnails', () => {
    const thumbnailTests: ThumbnailTest[] = [
      { input: { filePath: 'formats/avif/8bit-sRGB.avif', type: AssetType.IMAGE } },
      // { input: { filePath: 'formats/jpg/el_torcal_rocks.jpg', type: AssetType.IMAGE } },
      // { input: { filePath: 'formats/jxl/8bit-sRGB.jxl', type: AssetType.IMAGE } },
      // { input: { filePath: 'formats/heic/IMG_2682.heic', type: AssetType.IMAGE } },
      // { input: { filePath: 'formats/png/density_plot.png', type: AssetType.IMAGE } },
      // { input: { filePath: 'formats/raw/Nikon/D80/glarus.nef', type: AssetType.IMAGE } },
      // { input: { filePath: 'formats/raw/Nikon/D700/philadelphia.nef', type: AssetType.IMAGE } },
      // { input: { filePath: 'formats/raw/Panasonic/DMC-GH4/4_3.rw2', type: AssetType.IMAGE } },
      // { input: { filePath: 'formats/raw/Sony/ILCE-6300/12bit-compressed-(3_2).arw', type: AssetType.IMAGE } },
      // { input: { filePath: 'formats/raw/Sony/ILCE-7M2/14bit-uncompressed-(3_2).arw', type: AssetType.IMAGE } },
    ];

    it.each(thumbnailTests)(`should generate a thumbnail for $input.filePath`, async ({ input }) => {
      const filePath = join(testAssetDir, input.filePath);

      assetMock.getById.mockResolvedValue({
        id: 'asset-id',
        isVisible: true,
        originalPath: filePath,
        ownerId: 'owner-id',
        type: input.type,
      } as AssetEntity);

      await expect(sut.handleGenerateThumbnails({ id: 'asset-id' })).resolves.toBe(JobStatus.SUCCESS);

      expect(assetMock.upsertFile).toHaveBeenCalledWith([]);
    });
  });
});
