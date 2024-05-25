import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { User } from 'src/schemas/users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { Roles } from 'src/schemas/roles.schema';


@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User.name) private usersModel: Model<User>,
        @InjectModel(Roles.name) private rolesModel: Model<Roles>
    ) { }


    async create(dto: CreateUserDto) {
        const role = await this.rolesModel.findOne({ value: 'USER' })
            .then(role => {
                return role;
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
            });

        if (!role) {
            throw new HttpException('Role not found!', HttpStatus.BAD_REQUEST);
        }

        const user = await this.usersModel.create({...dto, role: role.value})
            .then(userx => {
                return userx
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
            });

        return user;
    }

    async findAll() {
        const users = await this.usersModel.find()
            .then(user => {
                return user
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
            });
        return users;
    }

    async findById(idx: ObjectId) {
        const user = await this.usersModel.findById(idx)
            .then(user => {
                if (!user) {
                    throw new HttpException('User not found!!!', HttpStatus.NOT_FOUND)
                }
                return user
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.NOT_FOUND)
            });
        return user;
    }

    async findByNumber(number: number) {
        const user = await this.usersModel.findOne({ number: number })
            .then(user => {
                if (!user) {
                    throw new HttpException('User not found!!!', HttpStatus.NOT_FOUND)
                }
                return user
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.NOT_FOUND)
            });
        return user;
    }

    async BanUser(idx: ObjectId) {
        const bannedUser = await this.usersModel.findByIdAndUpdate(idx, { banned: true })
            .then(user => {
                if (!user) {
                    throw new HttpException('User not found!!!', HttpStatus.NOT_FOUND)
                }
                return user
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.NOT_FOUND)
            });
        return bannedUser;
    }

    async UnBanUser(idx: ObjectId) {
        const unbannedUser = await this.usersModel.findByIdAndUpdate(idx, { banned: false })
            .then(user => {
                if (!user) {
                    throw new HttpException('User not found !!!', HttpStatus.NOT_FOUND)
                }
                return user
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.NOT_FOUND)
            });
        return unbannedUser;
    }

    async getBannedUsers() {
        const BannedUsers = await this.usersModel.find({ banned: true })
            .then(user => {
                return user
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
            });
        return BannedUsers;
    }

    async getUnBannedUsers() {
        const BannedUsers = await this.usersModel.find({ banned: false })
            .then(user => {
                return user
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
            });
        return BannedUsers;
    }

    async setRole(userId: ObjectId, val: string) {
        const role = await this.rolesModel.findOne({ value: val })
        .then(role => {
            return role;
        })
        .catch(err => {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        })

        if(!role) {
            throw new HttpException('Role not found!', HttpStatus.BAD_REQUEST);
        }

        const user = await this.usersModel.findByIdAndUpdate(userId, {
            role: role.value
        })
        .then(user => {
            return user;
        })
        .catch(err => {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        })

        if(!user) {
            throw new HttpException('User not found!', HttpStatus.BAD_REQUEST);
        }

        return user;

    }

    async remove(idx: ObjectId) {
        const user = await this.usersModel.findByIdAndDelete(idx)
            .then(user => {
                return user
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
            });
        return user;
    }
}