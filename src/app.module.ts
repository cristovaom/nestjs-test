import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { StoreModule } from './store/store.module';
import { ProductModule } from './product/product.module';
import { AuthModule } from './security/auth.module';
import { GraphqlModule } from './configs/graphql.module';
import { PrismaService } from './db-prisma/prisma.service';
@Module({
  imports: [UserModule, OrderModule, StoreModule, ProductModule, AuthModule, GraphqlModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
