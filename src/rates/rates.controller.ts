import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RatesService } from './rates.service';
import { CreateRateDto } from './dto/create-rates.dto';
import { ObjectId } from 'mongoose';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RatesDto } from 'src/api/rates.dto';

@ApiTags('Rates')
@Controller('rates')
export class RatesController {

        constructor(
            private ratesService: RatesService
        ) {}


        @UseGuards(AuthGuard)
        @ApiBearerAuth()
        @ApiOperation({summary: 'Find all rates'})
        @ApiResponse({type: [RatesDto]})
        @ApiResponse({status: 200, description: 'Rates found!'})
        @ApiResponse({status: 400, description: 'Bad request!'})
        @ApiResponse({status: 401, description: 'Unauthorized'})
        @Get()
        findAll() {
            return this.ratesService.findAll();
        }



        @UseGuards(AuthGuard)
        @ApiBearerAuth()
        @ApiOperation({summary: 'Create rate'})
        @ApiResponse({type: RatesDto})
        @ApiResponse({status: 201, description: 'Rate created!'})
        @ApiResponse({status: 400, description: 'Bad request!'})
        @ApiResponse({status: 401, description: 'Unauthorized'})
        @Post()
        create(@Body() dto: CreateRateDto) {
            return this.ratesService.create(dto);
        }


        @UseGuards(AuthGuard)
        @ApiBearerAuth()
        @ApiOperation({summary: 'Find rate by ID'})
        @ApiResponse({type: RatesDto})
        @ApiResponse({status: 201, description: 'Rate found!'})
        @ApiResponse({status: 400, description: 'Bad request!'})
        @ApiResponse({status: 401, description: 'Unauthorized'})
        @ApiResponse({status: 404, description: 'Not found'}) 
        @ApiParam({name: 'id', description: 'Rate id'})
        @Get('id/:id')
        findById(@Param('id') idx: ObjectId) {
            return this.ratesService.findById(idx);
        }

        @UseGuards(AuthGuard)
        @ApiBearerAuth()
        @ApiOperation({summary: 'Find rates by prouct ID'})
        @ApiResponse({type: [RatesDto]})
        @ApiResponse({status: 201, description: 'Rates found!'})
        @ApiResponse({status: 400, description: 'Bad request!'})
        @ApiResponse({status: 401, description: 'Unauthorized'})
        @ApiResponse({status: 404, description: 'Product Not found'}) 
        @ApiParam({name: 'id', description: 'Product id'})
        @Get('product/:id')
        findByProductId(@Param('id') idx: ObjectId) {
            return this.ratesService.findByProductId(idx);
        }


        @UseGuards(AuthGuard)
        @ApiBearerAuth()
        @ApiOperation({summary: 'Find rates by user ID'})
        @ApiResponse({type: [RatesDto]})
        @ApiResponse({status: 201, description: 'Rates found!'})
        @ApiResponse({status: 400, description: 'Bad request!'})
        @ApiResponse({status: 401, description: 'Unauthorized'})
        @ApiResponse({status: 404, description: 'User Not found'}) 
        @ApiParam({name: 'id', description: 'User id'})
        @Get('user/:id')
        findByUserId(@Param('id') idx: ObjectId) {
            return this.ratesService.findByUserId(idx);
        }


        @UseGuards(AuthGuard)
        @ApiBearerAuth()
        @ApiOperation({summary: 'Delete rates by ID'})
        @ApiResponse({type: RatesDto})
        @ApiResponse({status: 201, description: 'Rates deleted!'})
        @ApiResponse({status: 400, description: 'Bad request!'})
        @ApiResponse({status: 401, description: 'Unauthorized'})
        @ApiResponse({status: 404, description: 'Not found'}) 
        @ApiParam({name: 'id', description: 'Rate id'})
        @Delete(':id')
        remove(@Param('id') idx: ObjectId) {
            return this.ratesService.delete(idx);
        }


}