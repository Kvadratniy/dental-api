import { Controller, Get, Param, Request, Post, Body, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DiscountsService } from './discounts.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';

@Controller('api/discounts')
export class DiscountsController {

  constructor(
    private discountsService: DiscountsService
  ) {}

  @Get()
  getAll(){
    return this.discountsService.getAllDiscounts();
  }

  @ApiOperation({ summary: 'Создание скидкт'})
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Post()
  createDiscount(@Body() body: any, @Request() req: any) {
    return this.discountsService.createDiscount({...body, creator: req.user});
  }
}
