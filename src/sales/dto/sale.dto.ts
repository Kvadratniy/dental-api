import { Discount } from "src/discounts/entities/discount.entity"
import { Users } from "src/users/entity/user.entity";

export class CreateSaleDto {
  readonly creator: string
  readonly creationDate: string
  readonly responsibleManager: Users
  readonly discount: Discount
};