import { Module } from '@nestjs/common';
import { ColorsController } from './colors.controller';
import { ColorsService } from './colors.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Colors, ColorsSchema } from 'src/schemas/colors.schema';
import { Products, ProductsSchema } from 'src/schemas/products.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Colors.name, schema: ColorsSchema},
      {name: Products.name, schema: ProductsSchema}
    ])
  ],
  controllers: [ColorsController],
  providers: [ColorsService]
})
export class ColorsModule {}
