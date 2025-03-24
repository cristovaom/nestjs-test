import { Module } from '@nestjs/common';
import { OrderResolver } from './order.resolver';
import { OrderService } from './order.service';
import { OrderRepository } from './order.repository';
import { PrismaService } from 'src/db-prisma/prisma.service';
import { ProductService } from 'src/product/product.service';
import { ProductModule } from 'src/product/product.module';

@Module({
    imports: [ProductModule],
  providers: [OrderResolver, OrderService, OrderRepository, PrismaService],
  exports: [OrderService]
})
export class OrderModule {}
