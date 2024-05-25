import { Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comments.dto';
import { ObjectId } from 'mongoose';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CommentsDto } from 'src/api/comments.dto';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
    constructor(
        private commentsService: CommentsService
    ) {}


    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: 'Find comments'})
    @ApiResponse({type: [CommentsDto]})
    @ApiResponse({status: 200, description: 'Comments found!'})
    @ApiResponse({status: 400, description: 'Bad request!'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @Get()
    findAll() {
        return this.commentsService.findAll()
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: 'Create comment'})
    @ApiResponse({type: CommentsDto})
    @ApiResponse({status: 200, description: 'Comment created!'})
    @ApiResponse({status: 400, description: 'Bad request!'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @Post()
    create(dto: CreateCommentDto) {
        return this.commentsService.create(dto);
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: 'Find comment by ID.'})
    @ApiResponse({type: CommentsDto})
    @ApiResponse({status: 200, description: 'Comment find!'})
    @ApiResponse({status: 400, description: 'Bad request!'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @ApiResponse({status: 404, description: 'Not found'}) 
    @ApiParam({name: 'id', description: 'Comment id'}) 
    @Get('id/:id')
    findById(@Param('id') idx: ObjectId) {
        return this.commentsService.findById(idx);
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: 'Find comment by user ID.'})
    @ApiResponse({type: [CommentsDto]})
    @ApiResponse({status: 200, description: 'Comments find!'})
    @ApiResponse({status: 400, description: 'Bad request!'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @ApiParam({name: 'id', description: 'User id'}) 
    @Get('user/:id')
    findByUserId(@Param('id') idx: ObjectId) {
        return this.commentsService.findByUserId(idx);
    }


    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: 'Find comment by product ID.'})
    @ApiResponse({type: [CommentsDto]})
    @ApiResponse({status: 200, description: 'Comments find!'})
    @ApiResponse({status: 400, description: 'Bad request!'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @ApiParam({name: 'id', description: 'Product id'}) 
    @Get('product/:id')
    findByProductId(@Param('id') idx: ObjectId) {
        return this.commentsService.findByProductId(idx);
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: 'Delete comment by ID.'})
    @ApiResponse({type: [CommentsDto]})
    @ApiResponse({status: 200, description: 'Comment deleted!'})
    @ApiResponse({status: 400, description: 'Bad request!'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @ApiResponse({status: 404, description: 'Not found'}) 
    @ApiParam({name: 'id', description: 'Comment id'}) 
    @Delete(':id')
    remove(@Param('id') idx: ObjectId) {
        return this.commentsService.delete(idx);
    }
}
