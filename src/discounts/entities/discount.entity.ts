import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, JoinColumn, BaseEntity, JoinTable } from 'typeorm';
import { User } from '../../users/entity/user.entity';

@Entity()
export class Discount extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn()
  creator: User;

  @Column()
  creationDate: Date;

  @Column()
  endDate: Date;

  @Column()
  sale: number;

  @ManyToMany(() => User, (user) => user.discounts)
  @JoinTable()
  subscribers: User[];
}