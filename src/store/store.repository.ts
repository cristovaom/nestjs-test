import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import { PrismaService } from "src/db-prisma/prisma.service";





@Injectable()
export class StoryPrismaRepository{
    constructor(private readonly prisma: PrismaService) {}



    async findBySecretKey(secretKey: string){
        const store = await this.prisma.store.findFirst({
            where: { secretKey: secretKey } ,
        });
        if(!store){
            throw new Error('Store not found');
        }



        const getProductsByStoreId = await this.prisma.product.findMany({
            where: { storeId: store.id,
                status: 'ACTIVE'
             } ,
        });

        const getOrdersByStoreId = await this.prisma.order.findMany({
            where: { storeId: store.id,
                status: 'ACTIVE'
             } ,
        });


        return {
            products: getProductsByStoreId,
            orders: getOrdersByStoreId,
            ...store,
        };
    }

}
