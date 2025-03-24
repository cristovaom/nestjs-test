

import { Field, ObjectType } from '@nestjs/graphql';


@ObjectType()
export class LoginOutputDTO {
  @Field(() => String, { description: 'JWT access token' })
  access_token: string;
}
