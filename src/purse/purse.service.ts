import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Purse } from './entities/purse.entity';
import { Writeoff } from './entities/writeoff.entity';
import { Users } from '../users/entity/user.entity';
import { Sale } from 'src/sales/entities/sale.entity';

@Injectable()
export class PurseService {
  constructor(
    @InjectRepository(Purse)
    private repository: Repository<Purse>,

    @InjectRepository(Writeoff)
    private writeoffRep: Repository<Writeoff>,
  ) {}

  createPurse(user: Users) {
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

  async writeoffSum(user: Users, amount: number, date: Date) {
    const rec = new Writeoff();
    rec.amount = amount;
    rec.user = user;
    rec.date = date;
    const purse = await this.repository.findOne({
      where: {
        id: user.id,
      }
    });
    purse.balance = purse.balance - amount;
    this.repository.save(purse);
    const writeoff = this.writeoffRep.create(rec);
    return this.writeoffRep.save(writeoff);
  }

  getAllWriteoffs() {
    return this.writeoffRep.find({
      relations: ['user']
    });
  }
}
