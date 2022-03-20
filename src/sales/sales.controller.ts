import { Controller, Get, Request, Query, Post, Body, Put, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';
import { SalesService } from './sales.service';

@Controller('api/sales')
export class SalesController {
  constructor(
    private salesService: SalesService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllSales() {
    return this.salesService.getAllSales();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createSale(@Body() body: any,  @Request() req: any) {
    return this.salesService.createSale({...body, creator: req.user});
  }

  @Get('/user')
  getUserSales() {
    return this.salesService.getUserSales()
  }

}
