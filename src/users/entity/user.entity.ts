import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToMany, BaseEntity, OneToMany } from 'typeorm';
// import { Discount } from '../../discounts/entities/discount.entity';
import { Purse } from '../../purse/entities/purse.entity';
import { Discount } from '../../discounts/entities/discount.entity';

export enum UserRole {
  SUPERUSER = "superuser",
  ADMIN = "administrator",
  MANAGER = "manager",
  DIRECTOR = "director",
}

@Entity()
export class User extends BaseEntity {
  @ApiProperty({ example: '1', description: 'Уникальный ииденификатор'})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Иван', description: 'Имя пользователя'})
  @Column()
  firstName: string;

  @ApiProperty({ example: 'Иванов', description: 'Фамилия пользователя'})
  @Column()
  lastName: string;

  @ApiProperty({ example: 'example@example.ru', description: 'Почтовый адреы'})
  @Column()
  email: string;

  @ApiProperty({ example: '12345', description: 'Пароль'})
  @Column()
  password: string;

  @ApiProperty({ example: 'manager', description: 'Роль'})
  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.MANAGER
  })
  role: UserRole;

  @OneToOne(() => Purse)
  @JoinColumn()
  purse: Purse;

  @ManyToMany(() => Discount)
  @JoinColumn()
  discounts: Discount;

  @OneToMany(() => Discount, (discount) => discount.creator)
  createdDiscounts: Discount[];
}