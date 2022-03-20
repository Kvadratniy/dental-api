import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { PurseService } from '../purse/purse.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private purseModule: PurseService
  ) {}

  convertArray(items: string) {
    return items.split(',');
  }

  // Список всех пользователей
  getAllUsers(): Promise<User[]> {
    return this.usersRepository.find({
      relations: ['purse', 'discounts']
    });
  }

  getUser(id: string) {
    return this.usersRepository.findOne(id)
  }

   getUsers(ids: string) {
    const idsArray = ids.split(',');
    return this.usersRepository.find({
      where: { id: In(idsArray) }
    });
  }

  // Создать пользователя
  async createUser(dto: CreateUserDto) {
    const user = this.usersRepository.create(dto);
    const newUser = await this.usersRepository.save(user);
    this.purseModule.createPurse(newUser);
    return newUser;
  }

  // Удалить пользователя
  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  // Получить список скидок текущего пользователя
  async getUserDiscounts(id: string) {
    const user = await this.usersRepository.findOne({
      relations: ['discounts'],
      select: ['id'],
      where: {
        id
      },
    })
    return user.discounts;
  }

  // Получить пользователя по email
  getUserByEmail(email: string) {
    return this.usersRepository.findOne({
      where: {
        email,
      }
    });
  }
}