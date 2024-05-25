import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Roles } from 'src/schemas/roles.schema';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {

    constructor(
        @InjectModel(Roles.name) private rolesModel: Model<Roles>
    ) { }

    async create(dto: CreateRoleDto) {
        const role = await this.rolesModel.create(dto)
            .then(role => {
                return role;
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
            })

        return role;
    }

    async findAll() {
        const roles = await this.rolesModel.find()
            .then(roles => {
                return roles;
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
            })

        return roles;
    }

    async findById(idx: ObjectId) {
        const role = await this.rolesModel.findById(idx)
            .then(role => {
                return role;
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
            })

        if (!role) {
            throw new HttpException('Role not found!', HttpStatus.NOT_FOUND);
        }

        return role;
    }

    async findByValue(value: string) {
        const role = await this.rolesModel.findOne({ value: value })
            .then(role => {
                return role;
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
            })

        if (!role) {
            throw new HttpException('Role not found!', HttpStatus.NOT_FOUND);
        }

        return role;

    }

    async update(dto: UpdateRoleDto, idx: ObjectId) {
        const role = await this.rolesModel.findByIdAndUpdate(idx, { value: dto.value })
            .then(role => {
                return role;
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
            })

        if (!role) {
            throw new HttpException('Role not found!', HttpStatus.NOT_FOUND);
        }

        return role;
    }

    async delete(idx: ObjectId) {
        const role = await this.rolesModel.findByIdAndDelete(idx)
            .then(role => {
                return role;
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
            })

        if (!role) {
            throw new HttpException('Role not found!', HttpStatus.NOT_FOUND);
        }

        return role;
    }

}
