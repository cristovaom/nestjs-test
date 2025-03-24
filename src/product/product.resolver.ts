import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/security/admin.guard';
import { GqlAuthGuard } from 'src/security/graphql.guard';

@Resolver('Product')
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(() => ProductDto)
  @UseGuards( GqlAuthGuard,AdminGuard)
  async addProduct(
    @Args('input') createProductDto: CreateProductDto,
  ){
    return this.productService.addProduct(createProductDto);
  }


  @Query(() => [ProductDto])
  @UseGuards(GqlAuthGuard)
  async getAvailableProducts(){
    return this.productService.getAvailableProducts();
  }
}
