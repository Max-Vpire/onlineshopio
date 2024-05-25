import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Comments, CommentsSchema } from 'src/schemas/comments.schema';
import { Products, ProductsSchema } from 'src/schemas/products.schema';
import { User, UsersSchema } from 'src/schemas/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Comments.name,
      schema: CommentsSchema
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
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule {}
