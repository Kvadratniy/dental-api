import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
// import { Discount } from '../../discounts/entities/discount.entity';
import { Purse } from '../../purse/entities/purse.entity'

export enum UserRole {
  SUPERUSER = "superuser",
  ADMIN = "administrator",
  MANAGER = "manager",
  DIRECTOR = "director",
}

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.MANAGER
  })
  role: UserRole;

  @OneToOne(() => Purse)
  @JoinColumn()
  purse: Purse;

}