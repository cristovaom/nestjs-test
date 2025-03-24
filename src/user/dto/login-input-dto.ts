

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginInputDTO {
  @Field(() => String, { description: 'User email address' })
  email: string;

  @Field(() => String, { description: 'User password' })
  password: string;
}
