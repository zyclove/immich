import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { ArrayNotEmpty, IsDateString, IsEnum, IsInt, IsPositive } from 'class-validator';
import { AssetResponseDto } from 'src/dtos/asset-response.dto';
import { AssetStatus, AssetType, SyncAcknowledgeType, SyncResponseType } from 'src/enum';
import { ValidateDate, ValidateUUID } from 'src/validation';

export class SyncAcknowledgeDto {
  @IsEnum(SyncAcknowledgeType)
  type!: SyncAcknowledgeType;

  @IsDateString({ strict: true })
  timestamp!: string;
}

export class SyncCommonDeleteDtoV1 {
  id!: string;
  deletedAt!: string;
}

export class SyncCommonAssetDtoV1 {
  // TODO stop using these
  // deviceAssetId!: string;
  // deviceId!: string;

  id!: string;
  ownerId!: string;
  libraryId?: string;
  livePhotoVideoId?: string;

  createdAt!: string;
  deletedAt?: string;
  fileCreatedAt!: string;
  fileModifiedAt!: string;

  isFavorite!: boolean;
  isArchived!: boolean;
  isExternal!: boolean;
  isOffline!: boolean;

  type!: AssetType;
  status!: AssetStatus;

  thumbhash?: string;
  originalPath!: string;
  originalFileName!: string;
  checksum!: string;
  duration?: string;

  exifImageWidth?: number;
  exifImageHeight?: number;
  fileSizeInByte?: number;
  orientation?: string;
  dateTimeOriginal?: string;
  modifyDate?: string;
  latitude?: number;
  longitude?: number;
  projectionType?: string;
  city?: string;
  state?: string;
  country?: string;
  make?: string;
  model?: string;
  lensModel?: string;
  fNumber?: number;
  iso?: number;
  exposureTime?: string;
  profileDescription?: string;
  colorspace?: string;
  bitsPerSample?: number;
  rating?: number;
  fps?: number;
}

export class SyncActivityDtoV1 {}
export class SyncActivityDeleteDtoV1 extends SyncCommonDeleteDtoV1 {}

export class SyncAssetOwnerDtoV1 extends SyncCommonAssetDtoV1 {}
export class SyncAssetOwnerDeleteV1 extends SyncCommonDeleteDtoV1 {}

export class SyncAssetPartnerDtoV1 extends SyncCommonAssetDtoV1 {}
export class SyncAssetPartnerDeleteV1 extends SyncCommonDeleteDtoV1 {}

export class SyncAssetAlbumDtoV1 extends SyncCommonAssetDtoV1 {}
export class SyncAssetAlbumDeleteV1 extends SyncCommonDeleteDtoV1 {}

export class SyncAlbumDtoV1 {
  id!: string;
  name!: string;
  description!: string;
}
export class SyncAlbumDeleteV1 extends SyncCommonDeleteDtoV1 {}

export class SyncMemoryDtoV1 {
  id!: string;
  name!: string;
  description!: string;
}
export class SyncMemoryDelete extends SyncCommonDeleteDtoV1 {}

export class SyncAlbumAssetDtoV1 {
  @ApiProperty({ format: 'uuid' })
  albumId!: string;

  @ApiProperty({ format: 'uuid' })
  assetId!: string;

  createdAt!: string;
}

export class SyncAlbumAssetDeleteDtoV1 {
  @ApiProperty({ format: 'uuid' })
  albumId!: string;

  @ApiProperty({ format: 'uuid' })
  assetId!: string;

  deletedAt!: string;
}

const responseDtos = [
  SyncActivityDtoV1,
  SyncActivityDeleteDtoV1,

  SyncAssetOwnerDtoV1,
  SyncAssetOwnerDeleteV1,

  SyncAssetPartnerDtoV1,
  SyncAssetPartnerDeleteV1,

  SyncAssetAlbumDtoV1,
  SyncAssetAlbumDeleteV1,

  SyncAlbumDtoV1,
  SyncAlbumDeleteV1,

  SyncMemoryDtoV1,
  SyncMemoryDelete,

  SyncAlbumAssetDtoV1,
  SyncAlbumAssetDeleteDtoV1,
];

export const extraSyncModels = responseDtos;

export class SyncStreamResponseDto {
  @ApiProperty({ enum: SyncResponseType, enumName: 'SyncType' })
  type!: SyncResponseType;

  @ApiProperty({ anyOf: responseDtos.map((schema) => ({ $ref: getSchemaPath(schema) })) })
  data!: SyncCommonAssetDtoV1;
}

export class SyncStreamDto {
  @IsEnum(SyncResponseType, { each: true })
  @ApiProperty({ enum: SyncResponseType, isArray: true })
  @ArrayNotEmpty()
  types!: SyncResponseType[];
}

export class AssetFullSyncDto {
  @ValidateUUID({ optional: true })
  lastId?: string;

  @ValidateDate()
  updatedUntil!: Date;

  @IsInt()
  @IsPositive()
  @ApiProperty({ type: 'integer' })
  limit!: number;

  @ValidateUUID({ optional: true })
  userId?: string;
}

export class AssetDeltaSyncDto {
  @ValidateDate()
  updatedAfter!: Date;

  @ValidateUUID({ each: true })
  userIds!: string[];
}

export class AssetDeltaSyncResponseDto {
  needsFullSync!: boolean;
  upserted!: AssetResponseDto[];
  deleted!: string[];
}
