import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProductDto {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  price: number;

  @Field({ nullable: false })
  stock: number;

  @Field()
  storeId: string;
}
