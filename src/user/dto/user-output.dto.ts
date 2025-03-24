

import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class UserOutputDTO {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  role: string;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date ;
}
