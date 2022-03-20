import { Discount } from "src/discounts/entities/discount.entity"
import { User } from "src/users/entity/user.entity";

export class CreateSaleDto {
  readonly creator: string
  readonly creationDate: string
  readonly responsibleManager: User
  readonly discount: Discount
};