import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { OrderDto, OrderStatus } from './dtos/order.dto';
import { CreateOrderDto } from './dtos/create-order.dto';

import { User } from '@prisma/client';
import { CurrentUser } from 'src/security/graphql.guard';
import { GqlAuthGuard } from 'src/security/graphql.guard';
import { AdminGuard } from 'src/security/admin.guard';

@Resolver(() => OrderDto)
@UseGuards(GqlAuthGuard)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}



    @Mutation(() => OrderDto, {
        description: 'Place a new order'
    })
    @UseGuards(GqlAuthGuard)
    async placeOrder(
        @Args('createOrderDto') createOrderDto: CreateOrderDto
    ){
         const order = await this.orderService.placeOrder(createOrderDto);
         return order;
    }

    @Mutation(() => OrderDto, {
        description: 'Update order status'
    })
    @UseGuards(GqlAuthGuard, AdminGuard)
    async updateOrderStatus(
        @Args('orderId') orderId: string,
        @Args('status') status: OrderStatus
    ){
        if(!OrderStatus[status]){
            throw new Error('Invalid order status ' + status + ' must be one of ' + Object.values(OrderStatus).join(', '));
        }
        return await this.orderService.updateOrderStatus(orderId, status);
    }

  @Query(() => [OrderDto], {
    description: 'Get all orders for the current user'
  })
  @UseGuards(GqlAuthGuard)
  async getUserOrders(
    @CurrentUser() user: User
  ){
    const orders = await this.orderService.findOrdersByUserActiveSession(user.id);
    return orders;
  }

  @Query(() => OrderDto, {
    description: 'Get a specific order by ID'
  })
  @UseGuards(GqlAuthGuard)
  async getOrderById(
    @CurrentUser() user: User,
    @Args('orderId') orderId: string
  ){
    const order = await this.orderService.findOrderById(orderId, user.id, user.role);
    return order;
  }



}
