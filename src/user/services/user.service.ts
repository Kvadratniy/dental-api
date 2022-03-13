import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { PurseService } from '../../purse/services/purse.service';
import { CreateUserDto } from '../entities/dto/create-user.dto';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private purseModule: PurseService
  ) {}

  async createUser(dto: CreateUserDto) {
    let user = this.userRepository.create(dto);
    const valid = await this.isEmailUniq(user.email);
    if (!valid) return 'Пользователь с таким email уже зарегистрирован';
    user = await this.userRepository.save(user);
    this.createPurse(user);
    return this.userRepository.save(user);
  }

  getAllUsers() {
    return this.userRepository.find();
  }

  async isEmailUniq(email: string) {
    const all = await this.getAllUsers();
    const flag = all.some(item => item.email === email);
    return !flag
  }

  // Создание кошелька пользователся
  createPurse(user: User) {
    return this.purseModule.createPurse(user);
  }
}