import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from '../entities/sale.entity';
import { CreateSaleDto } from '../entities/sale.dto';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale) private salesRepository: Repository<Sale>
  ) {}

  async createSale(dto: CreateSaleDto) {
    const sale = this.salesRepository.create(dto);
    return this.salesRepository.save(sale);
  }

  getAllSales() {
    this.salesRepository.find();
  }
}
