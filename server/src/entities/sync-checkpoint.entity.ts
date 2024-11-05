import { SessionEntity } from 'src/entities/session.entity';
import { SyncAcknowledgeType } from 'src/enum';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('session_sync_checkpoints')
export class SyncCheckpointEntity {
  @ManyToOne(() => SessionEntity, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  session?: SessionEntity;

  @PrimaryColumn()
  sessionId!: string;

  @PrimaryColumn({ type: 'varchar' })
  type!: SyncAcknowledgeType;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;

  @Column({ type: 'timestamptz' })
  lastTimestamp!: string;
}
