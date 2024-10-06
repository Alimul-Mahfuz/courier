import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
    ) { }


    async prepareForAuthenticate(authenticateDto: AuthDto) {
        const { email } = authenticateDto;
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }
        return this.authenticate(user);
    }


    async authenticate(user: User) {
        const tokenPayload = {
            sub: user.id,  
            email: user.email
        };

        const token = this.jwtService.sign(tokenPayload);
        return {
            access_token: token
        };
    }
}
