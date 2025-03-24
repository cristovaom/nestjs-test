import { Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { Prisma } from '@prisma/client';
import { OrderDto } from './dtos/order.dto';
import { CreateOrderDto } from './dtos/create-order.dto';
import { ProductService } from 'src/product/product.service';
@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository,private readonly productService: ProductService) {}

  async findOrderById(id: string, userId: string,userRole: string) {
    if (!id) {
      throw new Error('Order ID is required');
    }
    const order = await this.orderRepository.findOrderById(id);
    if (!order) {
      throw new Error('Order not found');
    }
    if(order.userId !== userId && userRole !== 'ADMIN'){
      throw new Error('This order is not yours');
    }
    return this.mapToOrderDtoArray(order);
  }

  async findOrdersByUserActiveSession(userId: string) {
    if (!userId) {
      throw new Error('User ID is required');
    }
    const orders = await this.orderRepository.findOrdersByUserActiveSession(userId);
    return this.mapToOrderDtoArray(orders);
  }

  async placeOrder(order: CreateOrderDto) {
    if (!order) {
      throw new Error('Order data is required');
    }
    const products = await this.productService.getAvailableProducts();

    for(const item of order.orderItems!){
      const product = products.find(p => p.id === item.productId);
      if(!product){
        throw new Error('Product not found');
      }

      if(product.stock < item.quantity){
        throw new Error('Product not enough stock');
      }

      product.stock -= item.quantity;
    }
    const totalPrice = order.orderItems?.reduce(
      (sum, item) => {
        const product = products.find(p => p.id === item.productId);
        return sum + ((Number(product?.price) || 0) * item.quantity);
      },
      0
    ) || 0;

    const orderData: Prisma.OrderCreateInput = {
      totalPrice,
      status: order.status || 'PENDING',
      user: {
        connect: { id: order.userId }
      },
      store: {
        connect: { id: order.storeId }
      },
      orderItems: {
        create: order.orderItems?.map(item => ({
          quantity: item.quantity,
          price: products.find(p => p.id === item.productId)?.price || 0,
          product: {
            connect: { id: item.productId }
          }
        })) || []
      }
    };
    const newOrder = await this.orderRepository.placeOrder(orderData);
    for(const item of order.orderItems!){
      await this.productService.updateProductStock(item.productId, item.quantity);
    }
    return newOrder;
  }

  async updateOrderStatus(id: string, status: string) {
    if (!id || !status) {
      throw new Error('Order ID and status are required');
    }
    return await this.orderRepository.updateOrderStatus(id, status);
  }


  mapToOrderDtoArray(orders: any): OrderDto[] {
    const orderMap = new Map<string, OrderDto>();

    for (const entry of orders) {
      const { order, productId, quantity, price } = entry;

      if (!orderMap.has(order.id)) {
        orderMap.set(order.id, {
          id: order.id,
          userId: order.userId,
          storeId: order.storeId,
          totalPrice: Number(order.totalPrice),
          status: order.status,
          createdAt: order.createdAt,
          updatedAt: order.updatedAt,
          items: [],
        });
      }

      const orderDto = orderMap.get(order.id);
      orderDto?.items.push({
        productId,
        quantity,
        price: Number(price),
      });
    }

    return Array.from(orderMap.values());
  }
}
