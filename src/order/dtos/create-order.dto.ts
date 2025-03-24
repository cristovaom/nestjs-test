import { Field, InputType, Float } from '@nestjs/graphql';

@InputType()
export class CreateOrderDto {


  @Field(() => String, { description: 'Status of the order', nullable: true })
  status?: string;

  @Field(() => Date, { description: 'Creation date of the order', nullable: true })
  createdAt?: Date;

  @Field(() => Date, { description: 'Last update date of the order', nullable: true })
  updatedAt?: Date | null;

  @Field(() => String, { description: 'User ID who placed the order' })
  userId: string;

  @Field(() => String, { description: 'Store ID where the order is placed' })
  storeId: string;

  @Field(() => [OrderItemInput], { description: 'Items in the order', nullable: true })
  orderItems?: OrderItemInput[];
}

@InputType()
class OrderItemInput {
  @Field(() => String, { description: 'Product ID' })
  productId: string;

  @Field(() => Number, { description: 'Quantity of the product' })
  quantity: number;


}
