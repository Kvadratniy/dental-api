import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { User } from '../../user/entities/user.entity';


@Entity()
export class Discount {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  creator: string;

  @Column()
  creationDate: Date;

  @Column()
  endDate: Date;

  @Column()
  sale: string;

  // @ManyToMany(type => User, user => user.discounts)
  // subscribers: User[];

}