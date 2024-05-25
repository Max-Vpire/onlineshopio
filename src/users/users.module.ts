import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UsersSchema } from 'src/schemas/users.schema';
import { Roles, RolesSchema } from 'src/schemas/roles.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name, 
        schema: UsersSchema
      },
      {
        name: Roles.name,
        schema: RolesSchema
      }
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
