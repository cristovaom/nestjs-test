import { Injectable } from '@nestjs/common';
import { StoryPrismaRepository } from './store.repository';

@Injectable()
export class StoreService {
    constructor(private readonly storeRepository: StoryPrismaRepository) {}

    async getStoreInfo(secretKey: string) {
        if(!secretKey){
            throw new Error('Secret key is required');
        }
        const store = await this.storeRepository.findBySecretKey(secretKey);

        const InfoStore = {
            id: store.id,
            name: store.name,
            totalProducts: store.products.length,
            totalOrders: store.orders.length,
            totalRevenue: store.orders.reduce((acc, order) => acc + order.totalPrice.toNumber(), 0),
            products: store.products,
            orders: store.orders,
        }
        return InfoStore;
    }
}
