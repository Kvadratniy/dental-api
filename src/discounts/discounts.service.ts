import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Discount } from './entities/discount.entity';
import { CreateDiscountDto } from './dto/create-discount.dto'
import { AddSubscribersDto } from './dto/add-subscriber.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class DiscountsService {
  constructor(
    @InjectRepository(Discount)
    private discountRepository: Repository<Discount>,
    private userService: UsersService,
  ) {}

  getAllDiscounts(): Promise<Discount[]> {
    return this.discountRepository.find({
      relations: ['creator', 'subscribers']
    })
  }

  findOne(id: string): Promise<Discount> {
    return this.discountRepository.findOne(id);
  }

  /**
   * Создание скидки
   * @param discountDto
   * @returns Discount
   */
  async createDiscount(discountDto: CreateDiscountDto): Promise<Discount> {
    const discount = this.discountRepository.create(discountDto);
    discount.creationDate = new Date();
    const newDiscount = await this.discountRepository.save(discount);
    return newDiscount;
  }

  /**
   * Добавление подписчика на скидку
   * @param id
   * @param users
   */
  async addSubscriber(id: string, users: AddSubscribersDto[]) {
    const ids = users.map(({id}) => id);
    const selectedUsers = await this.userService.getUsers(ids.join());
    const discount = await this.discountRepository.findOne({
      relations: ['subscribers'],
      where: { id },
    });

    const subscribers = discount.subscribers.filter(({ id }) => !ids.includes(id));
    discount.subscribers = subscribers.concat(selectedUsers);
    return this.discountRepository.save(discount);
  }

  /**
   * Удаление подписчика на скидку
   * @param id
   * @param users
   */
  async removeSubscriber(id: string, users: AddSubscribersDto[]) {
    const ids = users.map(({id}) => id);
    const discount = await this.discountRepository.findOne({
      relations: ['subscribers'],
      where: { id },
    });

    const subscribers = discount.subscribers.filter(({ id }) => !ids.includes(id));
    discount.subscribers = subscribers;
    return this.discountRepository.save(discount);
  }
}
