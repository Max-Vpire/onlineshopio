import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Products, ProductsSchema } from 'src/schemas/products.schema';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [
    CategoryModule,
    MongooseModule.forFeature([{
      name: Products.name,
      schema: ProductsSchema
    }])
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService]
})
export class ProductsModule {}
