import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ObjectId } from 'mongoose';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ProductsDto } from 'src/api/products.dto';
import { Roles } from 'src/auth/guards/admin-auth.decorator';
import { AdminGuard } from 'src/auth/guards/roles.guard';
import { SetCountDto } from './dto/set-count.dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}


    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: 'Find all products'})
    @ApiResponse({type: [ProductsDto]})
    @ApiResponse({status: 200, description: 'Products found.'})
    @ApiResponse({status: 400, description: 'Bad request.'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @Get()
    findAll() {
       return this.productsService.findAll();
    }



    @Roles('ADMIN')
    @UseGuards(AdminGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: 'Create product.(admin)'})
    @ApiResponse({type: ProductsDto})
    @ApiResponse({status: 201, description: 'Product created.'})
    @ApiResponse({status: 400, description: 'Bad request.'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @ApiResponse({status: 403, description: 'Forbidden'})
    @Post()
    create(@Body() dto: CreateProductDto) {
        return this.productsService.create(dto);
    }



    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: 'Find product by id.'})
    @ApiParam({name: 'id', description: 'Product id for found!'})
    @ApiResponse({type: ProductsDto})
    @ApiResponse({status: 201, description: 'Product created.'})
    @ApiResponse({status: 400, description: 'Bad request.'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @ApiResponse({ status: 404, description: 'The brand not found.'})
    @Get('id/:id')
    getOne(@Param('id') idx: ObjectId) {
        return this.productsService.findById(idx);
    }



    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: 'Sarch product by name.'})
    @ApiParam({name: 'value', description: 'Product name for search!'})
    @ApiResponse({type: [ProductsDto]})
    @ApiResponse({status: 201, description: 'Product serhed.'})
    @ApiResponse({status: 400, description: 'Bad request.'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @Get('search/name/:value')
    searchByName(@Param('value') val: string) {
        return this.productsService.searchByName(val);
    }



    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: 'Sarch product by category.'})
    @ApiParam({name: 'value', description: 'Category value for search Product!'})
    @ApiResponse({type: [ProductsDto]})
    @ApiResponse({status: 201, description: 'Product searched.'})
    @ApiResponse({status: 400, description: 'Bad request.'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @Get('search/category/:value')
    searchByCategory(@Param('value') val: string) {
        return this.productsService.searchByCategory(val);
    }



    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: 'search product by brand.'})
    @ApiParam({name: 'value', description: 'Brand value for search Product!'})
    @ApiResponse({type: [ProductsDto]})
    @ApiResponse({status: 201, description: 'Product searched.'})
    @ApiResponse({status: 400, description: 'Bad request.'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @Get('search/brand/:value')
    searchByBrand(@Param('value') val: string) {
        return this.productsService.searchByBrands(val);
    }



    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: 'Select product by price.'})
    @ApiParam({name: 'price', description: 'Price value for search Product!'})
    @ApiResponse({type: [ProductsDto]})
    @ApiResponse({status: 201, description: 'Product searched.'})
    @ApiResponse({status: 400, description: 'Bad request.'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @Get('price/:price')
    selectByPrice(@Param('price') price: number) {
        return this.productsService.SelectByPrice(price);
    }



    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: 'Sell product.'})
    @ApiParam({name: 'id', description: 'Product id'})
    @ApiResponse({type: ProductsDto})
    @ApiResponse({status: 201, description: 'Product sold.'})
    @ApiResponse({status: 400, description: 'Bad request.'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @ApiResponse({ status: 404, description: 'The brand not found.'})
    @Put('sell/:id')
    sellProduct(@Param('id') idx: ObjectId) {
        return this.productsService.sellProduct(idx)
    }



    @Roles('ADMIN')
    @UseGuards(AdminGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: 'Edit count of product.(admin)'})
    @ApiParam({name: 'id', description: 'Product id for edit count!'})
    @ApiResponse({type: ProductsDto})
    @ApiResponse({status: 201, description: 'Product edited.'})
    @ApiResponse({status: 400, description: 'Bad request.'})
    @ApiResponse({status: 401, description: 'Unauthorized'}) 
    @ApiResponse({ status: 404, description: 'The product not found.'})
    @ApiResponse({status: 403, description: 'Forbidden'})
    @Put('count/:id')
    plusCount(
        @Body() dto: SetCountDto,
        @Param('id') idx: ObjectId
    ) {
        return this.productsService.PlusCountOfProduct(dto.count, idx)
    }


    
    @Roles('ADMIN')
    @UseGuards(AdminGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: 'Delete Product.(admin)'})
    @ApiParam({name: 'id', description: 'Product id for delete!'})
    @ApiResponse({type: ProductsDto})
    @ApiResponse({status: 201, description: 'Product deleted.'})
    @ApiResponse({status: 400, description: 'Bad request.'})
    @ApiResponse({status: 401, description: 'Unauthorized'}) 
    @ApiResponse({ status: 404, description: 'The product not found.'})
    @ApiResponse({status: 403, description: 'Forbidden'})
    @Delete(':id')
    delete(@Param('id') idx: ObjectId) {
        return this.productsService.delete(idx);
    }
}