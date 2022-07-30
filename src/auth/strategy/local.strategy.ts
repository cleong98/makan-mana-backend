import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { IStrategyOptions, Strategy } from 'passport-local';
import { UserService } from 'src/user/user.service';
import { compareSync } from 'bcryptjs';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
    constructor(
        private userService: UserService,
    ) {
        super({
            usernameField: 'email',
            passwordField: 'password'
        } as IStrategyOptions)
    }

    async validate(email: string, password: string) {
        const user = await this.userService.findOneByEmail(email, {showPass: true});
            if (!user) {
                throw new HttpException(new NotFoundException({
                    msg: "User Not Found"
                }), HttpStatus.NOT_FOUND);
            }
            if (!compareSync(password, user.password)) {
                throw new HttpException(new UnauthorizedException({
                    msg: "Password Incorrect"
                }), HttpStatus.UNAUTHORIZED);
            }
            return user;
    }
}