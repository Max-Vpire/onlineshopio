import { Module } from '@nestjs/common';
import { RatesController } from './rates.controller';
import { RatesService } from './rates.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Rates, RatesSchema } from 'src/schemas/rates.schema';
import { Products, ProductsSchema } from 'src/schemas/products.schema';
import { User, UsersSchema } from 'src/schemas/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Rates.name,
        schema: RatesSchema
      },
      {
        name: Products.name,
        schema: ProductsSchema
      },
      {
        name: User.name,
        schema: UsersSchema
      }
    ])
  ],
  controllers: [RatesController],
  providers: [RatesService]
})
export class RatesModule {}
