import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from 'src/schemas/category.schema';
import { BrandsModule } from 'src/brands/brands.module';

@Module({
  imports: [
    BrandsModule,
    MongooseModule.forFeature([{
      name: Category.name,
      schema: CategorySchema
    }])
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService]
})
export class CategoryModule {}
