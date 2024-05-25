import { Module } from '@nestjs/common';
import { BrandsController } from './brands.controller';
import { BrandsService } from './brands.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Brands, BrandsSchema } from 'src/schemas/brands.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Brands.name, schema: BrandsSchema}])
  ],
  controllers: [BrandsController],
  providers: [BrandsService],
  exports: [BrandsService]
})
export class BrandsModule {}
