import { Controller, UseGuards, Post, Body, Get, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';
import { PurseService } from './purse.service';
import { getQrCode } from '../libs/qrcode';

const host = 'https://tochiev-dc.ru/';

@Controller('api/purse')
export class PurseController {

  constructor(
    private purseService: PurseService
  ) {}
  
  @UseGuards(JwtAuthGuard)
  @Get('/writeoffs')
  getWriteoffs() {
    return this.purseService.getAllWriteoffs();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/qr')
  getQrCodeForWriteoff(@Request() req: any) {
    return getQrCode(`${host}/purse?user=${req.user.id}`);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createPurse(@Body() body: any) {
    return this.purseService.createPurse(body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/writeoff')
  writeoffSum(@Body() body: any) {
    return this.purseService.writeoffSum(body.user, body.amount, new Date());
  }
}
