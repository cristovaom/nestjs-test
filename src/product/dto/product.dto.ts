import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProductDto {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  price: number;

  @Field({ nullable: true })
  stock?: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
