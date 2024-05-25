import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TokenDto } from './dto/token.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOperation({summary: 'Login'})
    @ApiResponse({type: TokenDto})
    @ApiResponse({ status: 201, description: 'The user was registered successfully.'})
    @ApiResponse({ status: 400, description: 'Bad request.'})
    @Post('login')
     Login(@Body() dto: LoginDto) {
        return this.authService.Login(dto)
     }


    @ApiOperation({summary: 'Register'})
    @ApiResponse({type: TokenDto})
    @ApiResponse({ status: 200, description: 'The user was logined successfully.'})
    @ApiResponse({ status: 400, description: 'Bad request.'}) 
    @Post('register') 
     Register(@Body() dto: CreateUserDto) {
        return this.authService.Register(dto)
     }

     

}
