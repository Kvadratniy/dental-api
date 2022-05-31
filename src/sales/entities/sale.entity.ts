import { Discount } from 'src/discounts/entities/discount.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinColumn, BaseEntity, ManyToOne } from 'typeorm';
import { User } from '../../users/entity/user.entity';
import { Service } from '../../services/entities/service.entity';

export enum SaleStatus {
  draft = 'DRAFT',
  completed = 'COMPLETED',
}

@Entity()
export class Sale extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn()
  creator: string;

  @Column({ type: 'timestamptz' })
  creationDate: Date;

  @Column({default: 0})
  total: number;

  @Column("int", { array: true })
  servicesIds: number[];

  @Column({
    type: "enum",
    enum: SaleStatus,
    default: SaleStatus.draft
  })
  status: SaleStatus;

  @ManyToOne(() => User)
  @JoinColumn()
  responsibleManager: User;

  @ManyToOne(() => Discount)
  @JoinColumn()
  discount: Discount;
}