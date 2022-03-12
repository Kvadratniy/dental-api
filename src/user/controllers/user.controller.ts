import { Controller, Get } from '@nestjs/common';

@Controller('api/user')
export class UserController {

  @Get()
  getAll() {
    return [1,2,3];
  }

}
