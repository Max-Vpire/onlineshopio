import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ColorsService } from './colors.service';
import { CreateColorDto } from './dto/create-color.dto';
import { ObjectId } from 'mongoose';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/guards/admin-auth.decorator';
import { AdminGuard } from 'src/auth/guards/roles.guard';
import { ColorDto } from 'src/api/color.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@ApiTags('Colors')
@Controller('colors')
export class ColorsController {
    constructor(private colorservice: ColorsService) {}

    @Roles('ADMIN')
    @UseGuards(AdminGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: 'Create color.(admin)'})
    @ApiResponse({type: ColorDto})
    @ApiResponse({status: 201, description: 'Color created.'})
    @ApiResponse({status: 400, description: 'Bad request.'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @ApiResponse({status: 403, description: 'Forbidden'})
    @Post()
    create(@Body() dto: CreateColorDto) {
        return this.colorservice.create(dto);
    }



    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: 'Find all colors'})
    @ApiResponse({type: [ColorDto]})
    @ApiResponse({status: 200, description: 'Colors found.'})
    @ApiResponse({status: 400, description: 'Bad request.'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @Get()
    findAll() {
        return this.colorservice.findAll()
    }


    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: 'Find color by id'})
    @ApiResponse({type: ColorDto})
    @ApiResponse({status: 200, description: 'Color found.'})
    @ApiResponse({status: 400, description: 'Bad request.'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @ApiResponse({ status: 404, description: 'The color not found.'})
    @ApiParam({name: 'id', description: 'Color id'})
    @Get('id/:id')
    findById(@Param('id') idx: ObjectId) {
        return this.colorservice.findById(idx);
    }

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: 'Find colors by product id'})
    @ApiResponse({type: [ColorDto]})
    @ApiResponse({status: 200, description: 'Colors found.'})
    @ApiResponse({status: 400, description: 'Bad request.'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @ApiResponse({ status: 404, description: 'The product not found.'})
    @ApiParam({name: 'id', description: 'Product id for find colors'})
    @Get('product/:id')
    findByProductId(@Param('id') idx: string) {
        return this.colorservice.findByProductId(idx);
    }


    @Roles('ADMIN')
    @UseGuards(AdminGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: 'Delete color.(admin)'})
    @ApiResponse({type: ColorDto})
    @ApiResponse({status: 201, description: 'Color deleted.'})
    @ApiResponse({status: 400, description: 'Bad request.'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @ApiResponse({status: 403, description: 'Forbidden'})
    @ApiParam({name: 'id', description: 'Color id'})
    @Delete(':id')
    remove(@Param('id') idx: ObjectId) {
        return this.colorservice.delete(idx);
    }
}
