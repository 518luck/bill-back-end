import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('assets')
export class Asset {
  // 主键(唯一ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // 是否参与核算
  @Column({ type: 'boolean', default: true })
  included_in_bill_calc: boolean;

  // 资产余额
  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  balance: number;
}
