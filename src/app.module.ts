import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BrandsModule } from './brands/brands.module';
import { CategoryModule } from './category/category.module';
import { ProductsModule } from './products/products.module';
import { ColorsModule } from './colors/colors.module';
import { DescriptionsModule } from './descriptions/descriptions.module';
import { CommentsModule } from './comments/comments.module';
import { RatesModule } from './rates/rates.module';
import { BasketModule } from './basket/basket.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot('mongodb+srv://olimjonmakhmudov26156:max26156@shopapi.yctfo58.mongodb.net/shopapi?retryWrites=true&w=majority&appName=shopapi'),
    UsersModule,
    AuthModule,
    BrandsModule,
    CategoryModule,
    ProductsModule,
    ColorsModule,
    DescriptionsModule,
    CommentsModule,
    RatesModule,
    BasketModule,
    RolesModule
  ],
})
export class AppModule {}
