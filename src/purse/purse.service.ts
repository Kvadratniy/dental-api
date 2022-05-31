import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Purse } from './entities/purse.entity';
import { User } from '../users/entity/user.entity';
import { Sale } from 'src/sales/entities/sale.entity';

@Injectable()
export class PurseService {
  constructor(
    @InjectRepository(Purse)
    private repository: Repository<Purse>,
  ) {}

  createPurse(user: User) {
    const purse = new Purse();
    purse.user = user;
    const newPurse = this.repository.create(purse);
    return this.repository.save(newPurse);
  }

  async addToBalance(sale: Sale, benefits: number) {
    const purse = await this.repository.findOne({
      where: {
        id: sale.responsibleManager.id,
      }
    });
    purse.balance = purse.balance + (sale.total * (benefits/100));
    return this.repository.save(purse);
  }
}
