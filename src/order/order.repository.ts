import { Prisma } from "@prisma/client";
import { PrismaService } from "src/db-prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { randomUUID } from "crypto";


@Injectable()
export class OrderRepository{
    constructor(private readonly prisma: PrismaService) {}

    async findOrderById(id: string){
        const order = await this.prisma.order.findUnique({
            where: { id: id } ,
            include:{
                orderItems: true
            }
        });
        return order;
    }

    async findOrdersByUserActiveSession(userId: string){
        const orders = await this.prisma.orderItem.findMany({
            where: { order: { userId: userId, status: { in: ['ACTIVE', 'FINISHED','PENDING'] } } } ,
            include:{
                order: true,
                product: true
            }
        });
        if(!orders){
            throw new Error('Orders not found');
        }
        return orders;
    }

    async placeOrder(order: Prisma.OrderCreateInput){
        const newOrder = await this.prisma.order.create({
            data: {
                id: randomUUID(),
                totalPrice: order.totalPrice,
                status: order.status,
                user: {
                    connect: { id: order.user.connect?.id }
                },
                store: {
                    connect: { id: order.store.connect?.id }
                },
                orderItems: order.orderItems
            },
            include:{
                orderItems: true
            }
        });

        if(!newOrder){
            throw new Error('Order not created');
        }
        return newOrder;
    }

    async updateOrderStatus(id: string, status: string){
        const updatedOrder = await this.prisma.order.update({
            where: { id: id } ,
            data: { status: status } ,
        });
        if(!updatedOrder){
            throw new Error('Order not found');
        }
        return updatedOrder;
    }

}
