import { Injectable } from '@nestjs/common';
import { ProductPrismaRepository } from './product.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductService {
    constructor(private readonly productRepository: ProductPrismaRepository) {}

    async addProduct(product: Prisma.ProductUncheckedCreateInput) {
        return await this.productRepository.addProduct(product);
    }

    async getAvailableProducts() {
        return await this.productRepository.getAvailableProducts();
    }
}
