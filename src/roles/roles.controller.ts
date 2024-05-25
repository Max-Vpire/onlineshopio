import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ObjectId } from 'mongoose';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Roles } from 'src/auth/guards/admin-auth.decorator';
import { AdminGuard } from 'src/auth/guards/roles.guard';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesDto } from 'src/api/roles.dto';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
    
    constructor(
        private rolesService: RolesService
    ) {}

    @Roles('ADMIN')
    @UseGuards(AdminGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: 'Find all roles.(admin)'})
    @ApiResponse({type: [RolesDto]})
    @ApiResponse({ status: 200, description: 'Roles found.'})
    @ApiResponse({ status: 400, description: 'Bad request.'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    @Get()
    findAll() {
        return this.rolesService.findAll();
    }

    @Roles('ADMIN')
    @UseGuards(AdminGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: 'Create role.(admin)'})
    @ApiResponse({type: [RolesDto]})
    @ApiResponse({ status: 200, description: 'Role created.'})
    @ApiResponse({ status: 400, description: 'Bad request.'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    @Post()
    create(@Body() dto: CreateRoleDto) {
        return this.rolesService.create(dto);
    }

    @Roles('ADMIN')
    @UseGuards(AdminGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: 'find role by id.(admin)'})
    @ApiResponse({type: [RolesDto]})
    @ApiResponse({ status: 200, description: 'Role found.'})
    @ApiResponse({ status: 400, description: 'Bad request.'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    @ApiResponse({ status: 404, description: 'The role not found.'})
    @ApiParam({name: 'id', description: 'The role id'})
    @Get('id/:id')
    findById(@Param('id') idx: ObjectId) {
        return this.rolesService.findById(idx);
    }

    @Roles('ADMIN')
    @UseGuards(AdminGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: 'update role by id.(admin)'})
    @ApiResponse({type: [RolesDto]})
    @ApiResponse({ status: 200, description: 'Role updated.'})
    @ApiResponse({ status: 400, description: 'Bad request.'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    @ApiResponse({ status: 404, description: 'The role not found.'})
    @ApiParam({name: 'id', description: 'The role id'})
    @Put(':id')
    update(@Param('id') idx: ObjectId, @Body() dto: UpdateRoleDto) {
        return this.rolesService.update(dto, idx);
    }



    @Roles('ADMIN')
    @UseGuards(AdminGuard)
    @ApiBearerAuth()
    @ApiOperation({summary: 'delete role by id.(admin)'})
    @ApiResponse({type: [RolesDto]})
    @ApiResponse({ status: 200, description: 'Role deleted.'})
    @ApiResponse({ status: 400, description: 'Bad request.'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    @ApiResponse({ status: 404, description: 'The role not found.'})
    @ApiParam({name: 'id', description: 'The role id'})
    @Delete(':id')
    remove(@Param('id') idx: ObjectId) {
        return this.rolesService.delete(idx);
    }
}
