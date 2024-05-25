import { Module } from '@nestjs/common';
import { BasketController } from './basket.controller';
import { BasketService } from './basket.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Basket, BasketSchema } from 'src/schemas/basket.schema';
import { User, UsersSchema } from 'src/schemas/users.schema';
import { Products, ProductsSchema } from 'src/schemas/products.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Basket.name,
        schema: BasketSchema
      },
      {
        name: User.name,
        schema: UsersSchema
      },
      {
        name: Products.name,
        schema: ProductsSchema
      }
    ])
  ],
  controllers: [BasketController],
  providers: [BasketService]
})
export class BasketModule {}
