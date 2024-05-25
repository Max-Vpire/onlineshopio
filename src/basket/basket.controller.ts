import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { BasketService } from './basket.service';
import { CreateBasketDto } from './dto/create-basket.dto';
import { ObjectId } from 'mongoose';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { BasketDto } from 'src/api/basket.dto';

@ApiTags('Basket')
@Controller('basket')
export class BasketController {
 
    constructor(
        private basketService: BasketService
    ) {}


    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: 'Find all baskets'})
    @ApiResponse({type: [BasketDto]})
    @ApiResponse({ status: 200, description: 'The basket found.'})
    @ApiResponse({ status: 400, description: 'Bad request.'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @Get()
    findAll() {
        return this.basketService.findAll();
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: 'Create basket'})
    @ApiResponse({type: BasketDto})
    @ApiResponse({ status: 200, description: 'The basket created.'})
    @ApiResponse({ status: 400, description: 'Bad request.'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @Post()
    create(@Body() dto: CreateBasketDto) {
        return this.basketService.create(dto);
    }


    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: 'Find basket by id'})
    @ApiResponse({type: BasketDto})
    @ApiResponse({ status: 200, description: 'The basket found.'})
    @ApiResponse({ status: 400, description: 'Bad request.'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @ApiResponse({ status: 404, description: 'Not found.'})
    @ApiParam({name: 'id', description: 'The basket id'})
    @Get('id/:id')
    findById(@Param('id') idx: ObjectId) {
        return this.basketService.findById(idx);
    }


    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: 'Find basket by user id'})
    @ApiResponse({type: [BasketDto]})
    @ApiResponse({ status: 200, description: 'The basket found.'})
    @ApiResponse({ status: 400, description: 'Bad request.'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @ApiResponse({ status: 404, description: 'User Not found.'})
    @ApiParam({name: 'id', description: 'The user id'})
    @Get('user/:id')
    findByUserId(@Param('id') userId: ObjectId) {
        return this.basketService.findByUserId(userId);
    }


    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: 'Find basket by product id'})
    @ApiResponse({type: [BasketDto]})
    @ApiResponse({ status: 200, description: 'The basket found.'})
    @ApiResponse({ status: 400, description: 'Bad request.'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @ApiResponse({ status: 404, description: 'Product Not found.'})
    @ApiParam({name: 'id', description: 'The product id'})
    @Get('product/:id')
    findByProductId(@Param('id') productId: ObjectId) {
        return this.basketService.findByProductId(productId);
    }


    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: 'Delete basket by id'})
    @ApiResponse({type: BasketDto})
    @ApiResponse({ status: 200, description: 'The basket found.'})
    @ApiResponse({ status: 400, description: 'Bad request.'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @ApiResponse({ status: 404, description: 'Basket Not found.'})
    @ApiParam({name: 'id', description: 'The basket id'})
    @Delete(':id')
    remove(@Param('id') idx: ObjectId) {
        return this.basketService.delete(idx);
    }
}
