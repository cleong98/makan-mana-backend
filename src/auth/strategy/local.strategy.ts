import { BadRequestException, Injectable } from '@nestjs/common';
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
        try {
            const {data: user} = await this.userService.findOneByEmail(email);

            if (!compareSync(password, user.password)) {
                throw new BadRequestException('Password Incorrect')
            }

            return user;

        } catch(error) {
            throw new BadRequestException('Not Found User');
        }
        




    }
}