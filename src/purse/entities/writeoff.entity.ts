

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from 'typeorm';
import { User } from '../../users/entity/user.entity';

@Entity()
export class Writeoff extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamptz' })
  date: Date;

  @Column()
  amount: number;

  @ManyToOne(() => User)
  user: User;
}