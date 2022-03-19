import { Controller, Get, Param, Query, Post, Body, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guarfs';
import { User } from './entity/user.entity';
import { UsersService } from './users.service';
// import { User } from './entity/user';

@ApiTags('Users')
@Controller('api/users')
export class UsersController {

  constructor(
    private usersService: UsersService
  ) {}

  @ApiOperation({ summary: 'Все пользователи'})
  @ApiResponse({ status: 200, type: [User]})
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(){
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'Создание пользователя'})
  @ApiResponse({ status: 200, type: User})
  @Post()
  createUser(@Body() body: any) {
    return this.usersService.createUser(body);
  }
}