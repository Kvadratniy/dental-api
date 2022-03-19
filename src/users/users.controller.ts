import { Controller, Get, Param, Query, Post, Body, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
// import { User } from './entity/user';

@Controller('api/users')
export class UsersController {

  constructor(
    private usersService: UsersService
  ) {}

  @Get()
  getAll(){
    return this.usersService.getAllUsers();
  }

  @Post()
  createUser(@Body() body: any) {
    return this.usersService.createUser(body);
  }
}