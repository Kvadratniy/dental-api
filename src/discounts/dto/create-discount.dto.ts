import { ApiProperty } from "@nestjs/swagger";
import { Users } from '../../users/entity/user.entity'

export class CreateDiscountDto {
  @ApiProperty({ example: '15', description: 'Процент скидки'})
  readonly sale: number;
  readonly creator: Users;
};
