import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('plugins')
export class PluginEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deletedAt!: Date | null;

  @Column({ unique: true })
  packageId!: string;

  @Column()
  version!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column({ type: 'boolean', default: true })
  isEnabled!: boolean;

  @Column({ type: 'boolean', default: false })
  isInstalled!: boolean;

  @Column({ type: 'boolean', default: false })
  isTrusted!: boolean;

  @Column({ nullable: true })
  installPath!: string | null;
}
