import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  getAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async isEmailUniq(email: string) {
    const all = await this.getAllUsers();
    const flag = all.some(item => item.email === email);
    return !flag
  }

  // Создание кошелька пользователся
  createPurse(user: User) {
    // return this.purseModule.createPurse(user);{
  }

  getUserByEmail(email: string) {
    return this.usersRepository.findOne({
      where: {
        email,
      }
    });
  }

  async createUser(dto: CreateUserDto) {
    const user = this.usersRepository.create(dto);
    const newUser = await this.usersRepository.save(user);
    this.purseModule.createPurse(newUser);
    return newUser;
  }
}