import { ApiProperty } from "@nestjs/swagger";
import { Users } from '../../users/entity/user.entity'

export class AddSubscribersDto {
  @ApiProperty({ example: '1', description: 'Идентификатор пользователя'})
  readonly id: number;
};
