import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authenticatinService:AuthService){}

    @Post('/login')
    async checkCredentials(@Body() authdto:AuthDto){
        return await this.authenticatinService.prepareForAuthenticate(authdto)
    }
}
