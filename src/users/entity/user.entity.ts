import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToMany, BaseEntity, OneToMany, JoinTable } from 'typeorm';
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
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор'})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Иван', description: 'Имя пользователя'})
  @Column()
  firstName: string;

  @ApiProperty({ example: 'Иванов', description: 'Фамилия пользователя'})
  @Column()
  lastName: string;

  @ApiProperty({ example: 'example@example.ru', description: 'Почтовый адрес'})
  @Column()
  email: string;

  @ApiProperty({ example: '12345', description: 'Пароль'})
  @Column()
  password: string;

  @ApiProperty({ example: '5', description: 'Процент вознаграждения'})
  @Column({ default: 5 })
  benefits: number;

  @ApiProperty({ example: 'manager', description: 'Роль'})
  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.MANAGER
  })
  role: UserRole;

  @ApiProperty({ example: Purse, description: 'Кошелек'})
  @OneToOne(() => Purse)
  @JoinColumn()
  purse: Purse;

  @ManyToMany(() => Discount, (discount) => discount.subscribers)
  discounts: Discount[];
}