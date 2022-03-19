import { Controller, Get, Param, Query, Post, Body, Put, Delete } from '@nestjs/common';
import { SalesService } from './sales.service';

@Controller('api/sales')
export class SalesController {
  constructor(
    private salesService: SalesService
  ) {}

  @Get()
  getAllSales() {
    return this.salesService.getAllSales();
  }

  @Post()
  createSale(@Body() body: any) {
    return this.salesService.createSale(body);
  }

}
