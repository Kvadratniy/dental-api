import { ApiProperty } from "@nestjs/swagger";
import { User } from '../../users/entity/user.entity'

export class CreateDiscountDto {
  @ApiProperty({ example: '15', description: 'Процент скидки'})
  readonly sale: string
};