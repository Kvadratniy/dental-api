import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './entities/service.entity';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private repository: Repository<Service>
  ) {}

  // Список всех услуг
  getAll(): Promise<Service[]> {
    return this.repository.find();
  }

  async createService(dto) {
    const service = this.repository.create(dto);
    const newService = await this.repository.save(service);
    return newService;
  }
}
