import { HttpService } from '@nestjs/axios';
import { BadRequestException, HttpException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { compareSync } from 'bcryptjs';
import { lastValueFrom, map } from 'rxjs';
import { UserService } from 'src/user/user.service';


@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,  
    private readonly httpService: HttpService,
  ) {}
  create(createAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  async validateOauth2FromGoogle(tokenId: string) {
    try {
      const url = `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${tokenId}`;
      return lastValueFrom(
        await this.httpService.get(url).pipe(
            map(res => res.data)
        ),
      );
    } catch(e) {
      throw new UnauthorizedException({
        msg: "Not Found User",
      });
    }
  }

  async validateFacebook(tokenId: string) {
    
      const fields = ['id', 'name' ,'email', 'picture'].join(',');
      const getUserInfoUrl = `https://graph.facebook.com/me?access_token=${tokenId}&fields=${fields}`;
      return lastValueFrom(
        await this.httpService.get(getUserInfoUrl).pipe(
            map(res => res.data)
        ),
      );
  }

}
