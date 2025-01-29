import { AssetEntity } from 'src/entities/asset.entity';
import { UserEntity } from 'src/entities/user.entity';
import { Column, Entity, Index, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('asset_user')
@Index('IDX_assetId_userId', ['assetId', 'userId'])
export class AssetUserEntity {
  @PrimaryColumn()
  assetId!: string;

  @ManyToOne(() => AssetEntity, { onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: false })
  asset!: AssetEntity;

  @PrimaryColumn()
  userId!: string;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: false })
  user!: UserEntity;

  @Column()
  createdAt!: Date;
}
