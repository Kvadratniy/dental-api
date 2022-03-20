import { Discount } from 'src/discounts/entities/discount.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, BaseEntity, ManyToOne } from 'typeorm';
import { User } from '../../users/entity/user.entity';

@Entity()
export class Sale extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn()
  creator: string;

  @Column({ type: 'timestamptz' })
  creationDate: Date;

  @Column()
  total: number;

  @ManyToOne(() => User)
  @JoinColumn()
  responsibleManager: User;

  @ManyToOne(() => Discount)
  @JoinColumn()
  discount: Discount;
}