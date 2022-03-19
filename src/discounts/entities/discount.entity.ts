import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import { User } from '../../users/entity/user.entity';


@Entity()
export class Discount extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.createdDiscounts)
  @JoinColumn()
  creator: User;

  @Column()
  creationDate: Date;

  @Column()
  endDate: Date;

  @Column()
  sale: string;

  @ManyToMany(type => User, user => user.discounts)
  subscribers: User[];

}