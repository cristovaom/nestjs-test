import { Field, ObjectType, Float } from '@nestjs/graphql';

export const OrderStatus = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  FINISHED: 'FINISHED'
} as const;

export type OrderStatus = typeof OrderStatus[keyof typeof OrderStatus];

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
  status: OrderStatus;

  @Field(() => [OrderItemDto!]!)
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
