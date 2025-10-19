import { Entity, PrimaryColumn, Column, Index } from 'typeorm';
import { Exclude } from 'class-transformer';

import { IconType } from '@/enum/icon-type.enum';

@Index(['user_id', 'icon_name', 'type', 'title'], { unique: true })
@Entity('icon')
export class Icon {
  @PrimaryColumn({ type: 'varchar', length: 32 })
  id: string;

  @Exclude()
  @Column({ type: 'varchar', default: '0' })
  user_id: string; // 0 表示系统默认分类

  @Column({ length: 50 })
  title: string; // 分类名称

  @Column({ type: 'enum', enum: IconType })
  type: IconType; // 收入或支出

  @Column({ length: 100, nullable: true })
  icon_name: string; // 存 react-icons 组件名，比如 "FaUtensils"
}
