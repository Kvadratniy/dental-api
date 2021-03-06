import { Controller, Get, Param, Request, Post, Body, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DiscountsService } from './discounts.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';
import { AddSubscribersDto } from './dto/add-subscriber.dto';

@Controller('api/discounts')
export class DiscountsController {

  constructor(
    private discountsService: DiscountsService
  ) {}

  @ApiOperation({ summary: 'Список всех скидок'})
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Get('/all')
  findAll(){
    return this.discountsService.getAllDiscounts();
  }

  @ApiOperation({ summary: 'Получение скидки по идентификатору'})
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.discountsService.findOne(id);
  }

  @ApiOperation({ summary: 'Создание скидки'})
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  create(@Body() body: any, @Request() req: any) {
    return this.discountsService.createDiscount({...body, creator: req.user});
  }

  @ApiOperation({ summary: 'Добавление подписчика на скидку'})
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Put(':id/add-sub')
  addSubscriber(@Param('id') id: string, @Body() body: AddSubscribersDto[]) {
    return this.discountsService.addSubscriber(id, body);
  }

  @ApiOperation({ summary: 'Добавление подписчика на скидку'})
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Put(':id/remove-sub')
  removeSubscriber(@Param('id') id: string, @Body() body: AddSubscribersDto[]) {
    return this.discountsService.removeSubscriber(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/code')
  getQrCode() {
    return this.discountsService.getQrCode();
  }
}
