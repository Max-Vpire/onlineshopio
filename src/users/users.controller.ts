import { 
    Body, 
    Controller, 
    Delete, 
    Get, 
    Param, 
    Post, 
    Put, 
    UseGuards, 
    UsePipes, 
    ValidationPipe 
} from '@nestjs/common';

import { 
    ApiBearerAuth, 
    ApiOperation, 
    ApiParam, 
    ApiResponse, 
    ApiTags 
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ObjectId } from 'mongoose';

import { Roles } from 'src/auth/guards/admin-auth.decorator';
import { AdminGuard } from 'src/auth/guards/roles.guard';
import { SetRoleDto } from './dto/set-role.dto';
import { UsersDto } from 'src/api/users.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {}

    @Roles('ADMIN')
    @UseGuards(AdminGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: 'find all users. (admin)'})
    @ApiResponse({ type: [UsersDto]})
    @ApiResponse({ status: 200, description: 'The users was found successfully.'})
    @ApiResponse({ status: 400, description: 'Bad request.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @Get()
    FindAll() {
        return this.userService.findAll();
     }


    @ApiOperation({summary: 'Create user'})
    @ApiResponse({ type: UsersDto})
    @ApiResponse({ status: 201, description: 'The user was created successfully.'})
    @ApiResponse({ status: 400, description: 'Bad request.'})
    @Post() 
    @UsePipes(new ValidationPipe({ transform: true }))
    Create(@Body() dto: CreateUserDto) {
        return this.userService.create(dto);
     }


    @Roles('ADMIN')
    @UseGuards(AdminGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Find user by id. (admin)' }) 
    @ApiResponse( {type: UsersDto})
    @ApiResponse({ status: 200, description: 'The user was found successfully.'})
    @ApiResponse({ status: 400, description: 'Bad request.'})
    @ApiResponse({ status: 404, description: 'The user did not find.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @ApiParam({name: 'id', description: 'userId'})
    @Get('id/:id') 
    FindOne(@Param('id') idx: ObjectId)  {
        return this.userService.findById(idx);
     }


    @ApiOperation({summary: 'Find by phone number'}) 
    @ApiParam({name: 'number', description: 'Phone number'})
    @ApiResponse({ type:  UsersDto})
    @ApiResponse({ status: 200, description: 'The user was found successfully.'})
    @ApiResponse({ status: 400, description: 'Bad request.'})
    @ApiResponse({ status: 404, description: 'The user did not find.'})
    @Get('number/:number') 
    FindByNumber(@Param('number') number: number) {
        return this.userService.findByNumber(number);
     }


     @Roles('ADMIN')
     @UseGuards(AdminGuard)
     @ApiBearerAuth()
     @ApiOperation({summary: 'Find all banned users. (admin)'})
     @ApiResponse({type: [UsersDto]})
     @ApiResponse({ status: 200, description: 'The banned users was found successfully.'})
     @ApiResponse({ status: 400, description: 'Bad request.'})
     @ApiResponse({ status: 403, description: 'Forbidden.'})
     @ApiResponse({status: 401, description: 'Unauthorized'})
     @Get('/banned')
     FindAllBannedUsers() {
         return this.userService.getBannedUsers();
      }


     @Roles('ADMIN')
     @UseGuards(AdminGuard)
     @ApiBearerAuth()
     @ApiOperation({summary: 'Find all unbanned users. (admin)'})
     @ApiResponse({type: [UsersDto]})
     @ApiResponse({ status: 200, description: 'The unbanned users was found successfully.'})
     @ApiResponse({ status: 400, description: 'Bad request.'})
     @ApiResponse({ status: 403, description: 'Forbidden.'})
     @ApiResponse({status: 401, description: 'Unauthorized'})
     @Get('/unbanned')
     FindAllUnBannedUsers()  {
         return this.userService.getUnBannedUsers();
      }

     @Roles('ADMIN')
     @UseGuards(AdminGuard)
     @ApiBearerAuth()
     @ApiOperation({summary: 'Ban user.(admin)'}) 
     @ApiResponse({ status: 200, description: 'The user was banned successfully.'})
     @ApiResponse({ status: 400, description: 'Bad request.'})
     @ApiResponse({ status: 404, description: 'The user did not find.'})
     @ApiResponse({ status: 403, description: 'Forbidden.'})
     @ApiParam({name: 'id', description: 'userId for banning'})
     @ApiResponse({status: 401, description: 'Unauthorized'})
     @ApiResponse({ type:  UsersDto})
     @Put('/ban/:id')
     BanUser(@Param('id') idx: ObjectId) {
         return this.userService.BanUser(idx);
      }

    
     @Roles('ADMIN')
     @UseGuards(AdminGuard)
     @ApiBearerAuth()
     @ApiOperation({summary: 'Unban user. (admin)'}) 
     @ApiResponse({ status: 200, description: 'The user was unbanned successfully.'})
     @ApiResponse({ status: 400, description: 'Bad request.'})
     @ApiResponse({ status: 404, description: 'The user did not find.'})
     @ApiResponse({ status: 403, description: 'Forbidden.'})
     @ApiResponse({status: 401, description: 'Unauthorized'})
     @ApiParam({name: 'id', description: 'userId for unbanning'})
     @ApiResponse({ type:  UsersDto})
     @Put('unban/:id')
     UnBanUser(@Param('id') idx: ObjectId) {
         return this.userService.UnBanUser(idx)
      }

     @Roles('ADMIN')
     @UseGuards(AdminGuard)
     @ApiBearerAuth() 
     @ApiOperation({summary: 'Set Role user. (admin)'}) 
     @ApiResponse({type: UsersDto})
     @ApiResponse({ status: 200, description: 'The user`s role was edited successfully.'})
     @ApiResponse({ status: 400, description: 'Bad request.'})
     @ApiResponse({ status: 404, description: 'The user not found.'})
     @ApiResponse({ status: 403, description: 'Forbidden.'})
     @ApiResponse({status: 401, description: 'Unauthorized'})
     @ApiParam({name: 'id', description: 'userId for set role'})
     @UsePipes(new ValidationPipe({ transform: true }))
     @Put('set/role/:id/')
     Update(@Param('id') idx: ObjectId, @Body() dto: SetRoleDto) {
            return this.userService.setRole(idx, dto.role);
     }
     

     @Roles('ADMIN')
     @UseGuards(AdminGuard)
     @ApiBearerAuth()
     @ApiOperation({summary: 'Delete user. (admin)'}) 
     @ApiParam({name: 'id', description: 'userId for delete'})
     @ApiResponse({ status: 200, description: 'The user was unbanned successfully.'})
     @ApiResponse({ status: 400, description: 'Bad request.'})
     @ApiResponse({ status: 404, description: 'The user did not find.'})
     @ApiResponse({ status: 403, description: 'Forbidden.'})
     @ApiResponse({status: 401, description: 'Unauthorized'})
     @ApiParam({name: 'id', description: 'userId for unbanning'})
     @ApiResponse({ type:  UsersDto})
     @Delete(':id')
     DeleteUser(@Param('id') idx: ObjectId) {
         return this.userService.remove(idx)
      }

}
