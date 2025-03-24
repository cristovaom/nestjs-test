import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { ProductPrismaRepository } from './product.repository';
import { PrismaService } from 'src/db-prisma/prisma.service';
@Module({
  providers: [ProductResolver, ProductService, ProductPrismaRepository, PrismaService],
  exports: [ProductService],
})
export class ProductModule {}
