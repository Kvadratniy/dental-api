import { Controller, Get, Param, Query, Post, Body, Put, Delete } from '@nestjs/common';

import { PurseService } from '../services/purse.service';

@Controller('api/purse')
export class PurseController {

  constructor(
    private purseService: PurseService
  ) {}

  @Post()
  createPurse(@Body() body: any) {
    return this.purseService.createPurse(body);
  }
}
