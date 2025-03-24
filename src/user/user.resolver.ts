import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { RegisterUserDTO } from './dto/register-user.dto';
import { UserOutputDTO } from './dto/user-output.dto';
@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserOutputDTO)
  async register(@Args('user') user: RegisterUserDTO) {
    return this.userService.register(user);
  }

  @Query(() => UserOutputDTO)
  async findByEmail(@Args('email') email: string) {
    return this.userService.findByEmail(email);
  }

}
