import { Controller, Get, Param, Request, Post, Body, UseGuards, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';
import { User } from './entity/user.entity';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('api/user')
export class UsersController {

  constructor(
    private usersService: UsersService
  ) {}

  @ApiOperation({ summary: 'Все пользователи'})
  @ApiResponse({ status: 200, type: [User]})
  @UseGuards(JwtAuthGuard)
  @Get('/all')
  getAll(){
    return this.usersService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/filter')
  findByFilter(@Query() query) {
    return this.usersService.getUsers(query.ids);
  }

  @ApiOperation({ summary: 'Текущий пользователь'})
  @ApiResponse({ status: 200, type: User})
  @UseGuards(JwtAuthGuard)
  @Get('/current')
  getCurrentUser(@Request() req: any) {
    return this.usersService.getUser(req.user.id);
  }

  @ApiOperation({ summary: 'Скидки пользователя по ид'})
  @UseGuards(JwtAuthGuard)
  @Get('/discounts/:id')
  getUserDiscounts(@Param('id') id: string) {
    return this.usersService.getUserDiscounts(id);
  }


  @ApiOperation({ summary: 'Скидки пользователя'})
  @UseGuards(JwtAuthGuard)
  @Get('/discounts')
  getCurrentUserDiscounts(@Request() req: any) {
    return this.usersService.getUserDiscounts(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersService.getUser(id);
  }

  @ApiOperation({ summary: 'Создание пользователя'})
  @ApiResponse({ status: 200, type: User})
  @UseGuards(JwtAuthGuard)
  @Post()
  createUser(@Body() body: any) {
    return this.usersService.createUser(body);
  }
}