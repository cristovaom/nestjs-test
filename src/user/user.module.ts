import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { UserPrismaRepository } from './user.repository';
import { PrismaService } from 'src/db-prisma/prisma.service';

@Module({
  providers: [UserResolver, UserService, UserPrismaRepository,PrismaService],
  exports: [UserService],
})
export class UserModule {}
