import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './entities/sale.entity';
import { CreateSaleDto } from './dto/sale.dto';
import { PurseService } from 'src/purse/purse.service';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private salesRepository: Repository<Sale>,
    private purseModule: PurseService
  ) {}

  async createSale(dto: CreateSaleDto) {
    const newSale = await this.salesRepository.save(this.salesRepository.create(dto));
    const sale = await this.salesRepository.findOne({
      relations: ['responsibleManager', 'discount'],
      where: {
        id: newSale.id
      }
    });
    await this.purseModule.addToBalance(sale);
    return sale;
  }

  getAllSales() {
    return this.salesRepository.find({
      relations: ['responsibleManager', 'discount']
    });
  }

  getUserSales() {
    return this.salesRepository.find({
      relations: ['responsibleManager', 'discount'],
      where: {
        'responsibleManager': 1
      }
    });
  }
}
