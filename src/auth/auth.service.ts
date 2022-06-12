import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { Users } from 'src/users/entity/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException('Пользователь с таким email существует', HttpStatus.BAD_REQUEST)
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5);

    const user = await this.userService.createUser({...userDto, password: hashPassword});
    return this.generateToken(user)
  }

  async generateToken(user: Users) {
    const payload = { email: user.email, id: user.id, role: user.role }

    return {
      token: this.jwtService.sign(payload)
    }
  }

  async login(userDto: CreateUserDto) {

    const user = await this.validateUser(userDto);
    return this.generateToken(user)
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    const passwordEqual = await bcrypt.compare(userDto.password, user.password);
    if (user && passwordEqual) {
      return user;
    }

    throw new UnauthorizedException({ message: 'Не корректный email или пароль'})
  }

  // async getCurrentUser() {
  //   this.jwtService.decode()
  //   this.userService.findOne();
  // }
}
