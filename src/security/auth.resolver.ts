


import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';

import { UnauthorizedException } from '@nestjs/common';
import { LoginInputDTO } from 'src/user/dto/login-input-dto';
import { LoginOutputDTO } from 'src/user/dto/login-output.dto';

@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginOutputDTO)
  async login(@Args('loginInput') loginInput: LoginInputDTO) {
    const user = await this.authService.validateUser(loginInput.email, loginInput.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }


}
