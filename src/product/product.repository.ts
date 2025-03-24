
import { Injectable } from "@nestjs/common";
import { Prisma, Product } from "@prisma/client";
import { PrismaService } from "src/db-prisma/prisma.service";

@Injectable()
export class ProductPrismaRepository {
    constructor(private readonly prisma: PrismaService) {}

    async addProduct(product: Prisma.ProductUncheckedCreateInput) {
        const { storeId, ...productData } = product;

        return await this.prisma.product.create({
          data: {
            ...productData,
            store: {
              connect: {
                id: storeId,
              },
            },
          },
        });
    }

    async getAvailableProducts() {
        const productsAvailable = await this.prisma.product.findMany({
            where: {
                status: 'ACTIVE',
                stock: {
                    gt: 0
                }
            }
        });
        if (!productsAvailable) {
            throw new Error('No products available');
        }
        return productsAvailable;


    }
}
