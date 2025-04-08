import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResponseDto } from './auth.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authservice: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(
        @Body('username') username: string,
        @Body('password') password: string
    ): AuthResponseDto {
        return this.authservice.signIn(username, password)
    }
}
