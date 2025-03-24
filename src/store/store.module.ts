import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreResolver } from './store.resolver';
import { StoryPrismaRepository } from './store.repository';
import { PrismaService } from 'src/db-prisma/prisma.service';
@Module({
  providers: [StoreResolver, StoreService, StoryPrismaRepository, PrismaService],
  exports: [StoreService],
})
export class StoreModule {}
