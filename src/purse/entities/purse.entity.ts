import { Entity, PrimaryGeneratedColumn, Column, OneToOne, BaseEntity } from 'typeorm';
import { User } from '../../users/entity/user.entity';

@Entity()
export class Purse extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: 0})
  balance: number;

  @OneToOne(() => User, user => user.purse)
  user: User;
}