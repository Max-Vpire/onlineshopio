import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ObjectId } from 'mongoose';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CategoryDto } from 'src/api/category.dto';
import { Roles } from 'src/auth/guards/admin-auth.decorator';
import { AdminGuard } from 'src/auth/guards/roles.guard';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
    constructor(private categoryService: CategoryService) {}

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: 'Find all categoryes'})
    @ApiResponse({type: [CategoryDto]})
    @ApiResponse({status: 200, description: 'The categoryes found succesfully.'})
    @ApiResponse({status: 400, description: 'Bad request.'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @Get()
    FindAll() {
        return this.categoryService.findAll();
    }



    @Roles('ADMIN')
    @UseGuards(AdminGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: 'Create category.(admin)'})
    @ApiResponse({type: CategoryDto})
    @ApiResponse({status: 200, description: 'The categoryes created succesfully.'})
    @ApiResponse({status: 400, description: 'Bad request.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @UsePipes(new ValidationPipe({ transform: true }))
    @Post()
    Create(@Body() dto: CreateCategoryDto) {
        return this.categoryService.create(dto);
    }


    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: 'Find category by id'})
    @ApiParam({name: 'id', description: 'category id for find'})
    @ApiResponse({type: CategoryDto})
    @ApiResponse({status: 200, description: 'Category found'})
    @ApiResponse({status: 400, description: 'Bad request.'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @ApiResponse({status: 404, description: 'The category is not found'})
    @Get('id/:id')
    FindById(@Param('id') idx: ObjectId) {
        return this.categoryService.findById(idx);
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: 'Find category by brand value'})
    @ApiParam({name: 'value', description: 'brand value for find category'})
    @ApiResponse({type: [CategoryDto]})
    @ApiResponse({status: 200, description: 'Categoryes found'})
    @ApiResponse({status: 400, description: 'Bad request.'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @ApiResponse({status: 404, description: 'The brand is not found'})
    @Get('brand/:value')
    FindByBrand(@Param('value') val: string) {
        return this.categoryService.findByBrands(val);
    }


    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: 'Search by category value'})
    @ApiParam({name: 'value', description: 'The value of category for search'})
    @ApiResponse({type: [CategoryDto]})
    @ApiResponse({status: 200, description: 'Categoryes found'})
    @ApiResponse({status: 400, description: 'Bad request.'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @Get('search/:value')
    SearchCategory(@Param('value') val: string) {
        return this.categoryService.SearchCategory(val)
    }

    
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: 'Search by brand value'})
    @ApiParam({name: 'value', description: 'The value of brand for search category'})
    @ApiResponse({type: [CategoryDto]})
    @ApiResponse({status: 200, description: 'Categoryes found'})
    @ApiResponse({status: 400, description: 'Bad request.'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @Get('brand/search/:value')
    SearchByBrand(@Param('value') val: string) {
        return this.categoryService.SearchByBrand(val)
    }

    @Roles('ADMIN')
    @UseGuards(AdminGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: 'Update category. (admin)'})
    @ApiParam({name: 'id', description: 'Id for update the category'})
    @ApiResponse({type: CategoryDto})
    @ApiResponse({status: 200, description: 'Categoryes updated'})
    @ApiResponse({status: 400, description: 'Bad request.'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    @ApiResponse({status: 404, description: 'The category is not found'})
    @Put(':id')
    Update(@Body() dto: UpdateCategoryDto) {
        return this.Update(dto);
    }

    @Roles('ADMIN')
    @UseGuards(AdminGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: 'Delete category. (admin)'})
    @ApiParam({name: 'id', description: 'Id for delete the category'})
    @ApiResponse({type: CategoryDto})
    @ApiResponse({status: 200, description: 'Categoryes deleted'})
    @ApiResponse({status: 400, description: 'Bad request.'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    @ApiResponse({status: 404, description: 'The category is not found'})
    @Delete(':id')
    Remove(@Body('id') idx: ObjectId) {
        return this.categoryService.Remove(idx);
    }
}
