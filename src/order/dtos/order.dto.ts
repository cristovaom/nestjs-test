import { Field, ObjectType, Float } from '@nestjs/graphql';

@ObjectType()
export class OrderDto {
  @Field(() => String)
  id: string;

  @Field(() => String)
  userId: string;

  @Field(() => String)
  storeId: string;

  @Field(() => Float)
  totalPrice: number;

  @Field(() => String)
  status: string;

  @Field(() => [OrderItemDto])
  items: OrderItemDto[];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

@ObjectType()
class OrderItemDto {
  @Field(() => String)
  productId: string;

  @Field(() => Number)
  quantity: number;

  @Field(() => Float)
  price: number;
}
