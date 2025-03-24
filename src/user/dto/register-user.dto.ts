import { ObjectType, Field, ID, InputType } from '@nestjs/graphql';


@InputType()
export class RegisterUserDTO {
  @Field()
  email: string;

  @Field()
  name: string;

  @Field()
  password: string;

  @Field({ nullable: true,defaultValue: 'CLIENT' })
  role?: string;

}
