import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { RegisterUserDTO } from './dto/register-user.dto';
import { UserOutputDTO } from './dto/user-output.dto';
import { GqlAuthGuard } from 'src/security/graphql.guard';
import { UseGuards } from '@nestjs/common';
@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserOutputDTO)
  @UseGuards(GqlAuthGuard)
  async register(@Args('user') user: RegisterUserDTO) {
    return this.userService.register(user);
  }



}
