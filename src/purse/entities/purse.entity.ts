import { Entity, PrimaryGeneratedColumn, Column, OneToOne, BaseEntity, JoinColumn } from 'typeorm';
import { Users } from '../../users/entity/user.entity';

@Entity()
export class Purse extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: 0})
  balance: number;

  @OneToOne(() => Users, user => user.purse)
  user: Users;
}