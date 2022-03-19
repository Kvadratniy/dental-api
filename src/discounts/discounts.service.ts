import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Discount } from './entities/discount.entity';
import { CreateDiscountDto } from './entities/create-discount.dto'

@Injectable()
export class DiscountsService {
  constructor(
    @InjectRepository(Discount)
    private discountRepository: Repository<Discount>,
  ) {}

  getAllDiscounts(): Promise<Discount[]> {
    return this.discountRepository.find({
      relations: ['creator']
    })
  }

  findOneDiscount(id: string): Promise<Discount> {
    return this.discountRepository.findOne(id);
  }

  async createDiscount(discountDto: CreateDiscountDto): Promise<any> {
    // return discountDto;
    const discount = this.discountRepository.create(discountDto);
    discount.creationDate = new Date();
    const newDiscount = await this.discountRepository.save(discount);
    return newDiscount;
  }
}
