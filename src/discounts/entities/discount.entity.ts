import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, JoinColumn, BaseEntity, JoinTable } from 'typeorm';
import { Users } from '../../users/entity/user.entity';

@Entity()
export class Discount extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users)
  @JoinColumn()
  creator: Users;

  @Column()
  creationDate: Date;

  @Column()
  endDate: Date;

  @Column()
  sale: number;

  @ManyToMany(() => Users, (user) => user.discounts)
  @JoinTable()
  subscribers: Users[];
}