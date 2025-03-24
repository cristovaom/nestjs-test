import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { StoreService } from './store.service';
import { StoreInfoDto } from './dtos/store-info.dto';


@Resolver(() => StoreInfoDto)
export class StoreResolver {
  constructor(private readonly storeService: StoreService) {}

  @Query(() => StoreInfoDto)
  async ecommerceState(
    @Args('secretKey', {
      description: 'The secret key for the store'
    }) secretKey: string
  ) {
    return this.storeService.getStoreInfo(secretKey);
  }
}
