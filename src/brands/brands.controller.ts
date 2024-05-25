import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { CreateBrandsDto } from './dto/create-brands.dto';
import { ObjectId } from 'mongoose';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/auth/guards/admin-auth.decorator';
import { AdminGuard } from 'src/auth/guards/roles.guard';
import { BrandsDto } from 'src/api/brands.dto';

@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
    constructor(private brandsService: BrandsService) { }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: 'Find all brands'})
    @ApiResponse({type: [BrandsDto]})
    @ApiResponse({ status: 200, description: 'The brands was found successfully.'})
    @ApiResponse({ status: 400, description: 'Bad request.'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @Get()
    FindAll() {
        return this.brandsService.findAll();
    }


    @Roles('ADMIN')
    @UseGuards(AdminGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: 'Create brand. (admin)'})
    @ApiResponse({type: BrandsDto})
    @ApiResponse({ status: 201, description: 'The brand was created successfully.'})
    @ApiResponse({ status: 400, description: 'Bad request.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @UsePipes(new ValidationPipe({ transform: true }))
    @Post()
    create(@Body() dto: CreateBrandsDto) {
        return this.brandsService.create(dto);
    }



    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: 'Find brand by id.'})
    @ApiResponse({type: BrandsDto})
    @ApiResponse({ status: 200, description: 'The brand found successfully.'})
    @ApiResponse({ status: 400, description: 'Bad request.'})
    @ApiResponse({ status: 404, description: 'The brand not found.'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @ApiParam({name: 'id', description: 'The brand id'})
    @Get('id/:id')
    FindById(@Param('id') idx: ObjectId) {
        return this.brandsService.findById(idx);
    }



    @UseGuards(AuthGuard)
    @ApiOperation({summary: 'Find by value.'})
    @ApiBearerAuth()
    @ApiResponse({type: BrandsDto})
    @ApiParam({name: 'value', description: 'The brand value'})
    @ApiResponse({ status: 200, description: 'The brand found successfully.'})
    @ApiResponse({ status: 400, description: 'Bad request.'})
    @ApiResponse({ status: 404, description: 'The brand not found.'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @Get('value/:value')
    FindByValue(@Param('value') val: string) {
        return this.brandsService.findByValue(val);
    }

    @UseGuards(AuthGuard)
    @ApiOperation({summary: 'Search by value.'})
    @ApiBearerAuth()
    @ApiResponse({type: [BrandsDto]})
    @ApiParam({name: 'value', description: 'The brand value'})
    @ApiResponse({ status: 200, description: 'The brand found successfully.'})
    @ApiResponse({ status: 400, description: 'Bad request.'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @Get('search/:value')
    SearchBrands(@Param('value') val: string) {
        return this.brandsService.searchByValue(val);
    }

    @Roles('ADMIN')
    @UseGuards(AdminGuard)
    @ApiResponse({type: BrandsDto})
    @ApiBearerAuth()
    @ApiOperation({summary: 'Update brand.(admin)'})
    @ApiParam({name: 'id', description: 'The brand id for update'})
    @ApiResponse({ status: 200, description: 'The brand update successfully.'})
    @ApiResponse({ status: 400, description: 'Bad request.'})
    @ApiResponse({ status: 404, description: 'The brand not found.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @UsePipes(new ValidationPipe({ transform: true }))
    @Put(':id')
    Update(
        @Param('id') idx: ObjectId,
        @Body() dto: CreateBrandsDto
    ) {
        return this.brandsService.update(idx, dto)
    }



    @Roles('ADMIN')
    @UseGuards(AdminGuard)
    @ApiBearerAuth()
    @ApiResponse({type: BrandsDto})
    @ApiOperation({summary: 'Delete brand.(admin)'})
    @ApiParam({name: 'id', description: 'The brand id for remove'})
    @ApiResponse({ status: 200, description: 'The brand deleted successfully.'})
    @ApiResponse({ status: 400, description: 'Bad request.'})
    @ApiResponse({ status: 404, description: 'The brand not found.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @Delete(':id')
    Remove(@Param('id') idx: ObjectId) {
        return this.brandsService.delete(idx);
    }
}
