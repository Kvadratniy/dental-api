import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale, SaleStatus } from './entities/sale.entity';
import { CreateSaleDto } from './dto/sale.dto';
import { PurseService } from 'src/purse/purse.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private salesRepository: Repository<Sale>,
    private purseModule: PurseService,
    private userService: UsersService,
  ) {}

  async createSale(dto: CreateSaleDto) {
    const newSale = await this.salesRepository.save(this.salesRepository.create(dto));
    const sale = await this.salesRepository.findOne({
      relations: ['responsibleManager', 'discount'],
      where: {
        id: newSale.id
      }
    });
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

  async completeSale(body: any) {
    const sale = await this.salesRepository.findOne(body.id,{
      relations: ['responsibleManager', 'discount']
    });
    sale.total = body.total;
    sale.servicesIds = body.servicesIds;
    sale.status = SaleStatus.completed;
    const resp = await this.salesRepository.save(sale);
    const user = await this.userService.getUser(sale.responsibleManager.id.toString());
    await this.purseModule.addToBalance(sale, user.benefits);
    return resp;
  }
}
