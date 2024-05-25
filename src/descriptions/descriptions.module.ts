import { Module } from '@nestjs/common';
import { DescriptionsController } from './descriptions.controller';
import { DescriptionsService } from './descriptions.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Descripions, DescripionsSchema } from 'src/schemas/description.schema';
import { Products, ProductsSchema } from 'src/schemas/products.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Descripions.name, schema: DescripionsSchema},
      {name: Products.name, schema: ProductsSchema}
    ])
  ],
  controllers: [DescriptionsController],
  providers: [DescriptionsService]
})
export class DescriptionsModule {}
