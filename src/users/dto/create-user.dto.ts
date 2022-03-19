import { ApiProperty } from "@nestjs/swagger"

export class CreateUserDto {

  @ApiProperty({ example: 'example@example.com', description: 'Почтовый адрес'})
  readonly email: string

  @ApiProperty({ example: '12345', description: 'Пароль'})
  readonly password: string
};