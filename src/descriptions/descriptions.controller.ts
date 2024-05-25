import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { DescriptionsService } from './descriptions.service';
import { CreateDecriptionDto } from './dto/create-description.dto';
import { ObjectId } from 'mongoose';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { DescriptionDto } from 'src/api/description.dto';
import { UpdateDescriptionDto } from './dto/update.dto';
import { Roles } from 'src/auth/guards/admin-auth.decorator';
import { AdminGuard } from 'src/auth/guards/roles.guard';

@ApiTags('Description')
@Controller('descriptions')
export class DescriptionsController {
    constructor(
        private descriptionService: DescriptionsService
    ){ }

    @UseGuards(AuthGuard)    
    @ApiBearerAuth()
    @ApiOperation({summary: 'Find all descriptions.'})
    @ApiResponse({type: [DescriptionDto]})
    @ApiResponse({status: 200, description: 'Descriptions found!'})
    @ApiResponse({status: 400, description: 'Bad request!'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @Get()
    findAll() {
        return this.descriptionService.findAll();
    }


    @Roles('ADMIN')
    @UseGuards(AdminGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: 'Create description.(admin)'})
    @ApiResponse({type: DescriptionDto})
    @ApiResponse({status: 200, description: 'Description creted!'})
    @ApiResponse({status: 400, description: 'Bad request!'})
    @ApiResponse({status: 401, description: 'Unauthorized'}) 
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    @Post()
    create(@Body() dto: CreateDecriptionDto) {
        return this.descriptionService.create(dto);
    }


    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: 'find description by ID.'})
    @ApiResponse({type: DescriptionDto})
    @ApiResponse({status: 200, description: 'Description found!'})
    @ApiResponse({status: 400, description: 'Bad request!'})
    @ApiResponse({status: 401, description: 'Unauthorized'}) 
    @ApiResponse({status: 404, description: 'Not found'}) 
    @ApiParam({name: 'id', description: 'Description id'})
    @Get('id/:id')
    findById(@Param('id') idx: ObjectId) {
        return this.descriptionService.findById(idx);
    }


    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: 'find description by product ID.'})
    @ApiResponse({type: [DescriptionDto]})
    @ApiResponse({status: 200, description: 'Descriptions found!'})
    @ApiResponse({status: 400, description: 'Bad request!'})
    @ApiResponse({status: 401, description: 'Unauthorized'}) 
    @ApiResponse({status: 404, description: 'Not found'}) 
    @ApiParam({name: 'id', description: 'Product id'})
    @Get('product/:id')
    findByProductId(@Param('id') productId: ObjectId) {
        return this.descriptionService.findByProductId(productId);
    }


    @Roles('ADMIN')
    @UseGuards(AdminGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: 'update description by ID.(admin)'})
    @ApiResponse({type: DescriptionDto})
    @ApiResponse({status: 200, description: 'Description updated!'})
    @ApiResponse({status: 400, description: 'Bad request!'})
    @ApiResponse({status: 401, description: 'Unauthorized'}) 
    @ApiResponse({status: 404, description: 'Not found'}) 
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    @ApiParam({name: 'id', description: 'Description id'}) 
    @Put(':id')
    update(@Param('id') idx: ObjectId, @Body() dto: UpdateDescriptionDto) {
        return this.descriptionService.editDescription(idx, dto.description)
    }

    @Roles('ADMIN')
    @UseGuards(AdminGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: 'delete description by ID.(admin)'})
    @ApiResponse({type: DescriptionDto})
    @ApiResponse({status: 200, description: 'Description deleted!'})
    @ApiResponse({status: 400, description: 'Bad request!'})
    @ApiResponse({status: 401, description: 'Unauthorized'}) 
    @ApiResponse({status: 404, description: 'Not found'}) 
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    @ApiParam({name: 'id', description: 'Description id'}) 
    @Delete(':id')
    delete(@Param('id') idx: ObjectId) {
        return this.descriptionService.deleteDescription(idx);
    }

}
