import { Controller, Get, Param, Request, Post, Body, Put, UseGuards, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';
import { ServicesService } from './services.service';
import { Service } from './entities/service.entity';

@ApiTags('Services')
@Controller('api/services')
export class ServicesController {
  constructor(
    private servicesService: ServicesService
  ) {}

  @ApiOperation({ summary: 'Все услуги'})
  @ApiResponse({ status: 200, type: [Service]})
  @UseGuards(JwtAuthGuard)
  @Get('/all')
  getAll(){
    return this.servicesService.getAll();
  }

  @ApiOperation({ summary: 'Создание услуги'})
  @ApiResponse({ status: 200, type: Service})
  @UseGuards(JwtAuthGuard)
  @Post()
  createUser(@Body() body: any) {
    return this.servicesService.createService(body);
  }
}
