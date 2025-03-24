import { Field, ObjectType, Float } from '@nestjs/graphql';
import { ProductDto } from '../../product/dto/product.dto';
import { OrderDto } from 'src/order/dtos/order.dto';

@ObjectType({ description: 'Store information with statistics' })
export class StoreInfoDto {
  @Field(() => String, { description: 'The unique identifier of the store' })
  id: string;

  @Field(() => String, { description: 'The name of the store' })
  name: string;

  @Field(() => Number, { description: 'Total number of products in the store' })
  totalProducts: number;

  @Field(() => Number, { description: 'Total number of orders in the store' })
  totalOrders: number;

  @Field(() => Float, { description: 'Total revenue of the store' })
  totalRevenue: number;

  @Field(() => [ProductDto], { description: 'List of products in the store' })
  products: ProductDto[];

  @Field(() => [OrderDto], { description: 'List of orders in the store' })
  orders: OrderDto[];
}
