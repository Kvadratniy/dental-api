import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, BaseEntity } from 'typeorm';
import { User } from '../../users/entity/user.entity';

@Entity()
export class Sale extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  creator: string;

  @Column({ type: 'timestamptz' })
  creationDate: Date;

  @Column()
  total: number;

  @OneToOne(() => User)
  @JoinColumn()
  responsibleManager: string;

  @Column()
  discount: string;
}