import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { PayloadDto } from './dto/payload.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/schemas/users.schema';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async Register(userDto: CreateUserDto) {
        const hashedPassword = await bcrypt.hash(userDto.password, 10)
        const userAuth = {
            name: userDto.name,
            surname: userDto.surname,
            number: userDto.number,
            password: hashedPassword,
        }
        const user = await this.usersService.create(userAuth)
            .then(user => {
                return this.GenerateToken(user)
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
            })
        return user;
    }

    async Login(userDto: LoginDto){
        const user = await this.validateUser(userDto)
            .then(user => {
                return user
            })
            .catch(err => {
                throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
            })
            if(user.banned){
                throw new HttpException('User banned for some reason...', HttpStatus.FORBIDDEN);
            }
        return this.GenerateToken(user)
    }

    private async validateUser(userDto: LoginDto) {
        const user = await this.usersService.findByNumber(userDto.number);
        if (user) {
            const passwordEquals = await bcrypt.compare(userDto.password, user.password);
            if (passwordEquals) {
                return user;
            }
            throw new UnauthorizedException({ message: 'The password is wrong!' })
        }
        throw new UnauthorizedException({ message: 'The password is wrong' })
    }

    private async GenerateToken(user: User) {
        const payload = {user}

        return {
            token: await this.jwtService.signAsync(payload)
        }
    }
}
