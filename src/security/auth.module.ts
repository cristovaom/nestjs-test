import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AuthResolver } from './auth.resolver';
import { UserModule } from 'src/user/user.module';
import { PrismaService } from 'src/db-prisma/prisma.service';
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default_secret_key',
      signOptions: { expiresIn: '3h' },
    }),
    UserModule
  ],
  providers: [PrismaService,JwtStrategy, AuthResolver, AuthService],
  controllers: [],
  exports: [AuthService],
})
export class AuthModule {}
