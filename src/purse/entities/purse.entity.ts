import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';


@Entity()
export class Purse {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: 0})
  balance: number;

  @OneToOne(() => User, user => user.purse)
  user: User;
}