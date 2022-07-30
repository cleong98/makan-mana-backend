import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role, UserType } from '@prisma/client';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserType as User } from 'src/user/type/user-type';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorator/current-user.decorator';
import { FacebookAuthDto } from './dto/facebook_auth.dto';
import { GoogleAuthDto } from './dto/google_auth.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService, 
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}


  @Post('login')
  @UseGuards(AuthGuard('local'))
  login(@CurrentUser() user: User) {
    try {
      return {
        token: this.jwtService.sign(user.uniqueId),
        data: user,
      };

    } catch (e) {
      throw e;
    }
  }

 @Post('oauth/google')
 async googleSignin(@Body() googleAuthDto: GoogleAuthDto) {
  try {
    const result = await this.authService.validateOauth2FromGoogle(googleAuthDto.tokenId);
    if (result) {
      const userDto: CreateUserDto = {
        email: result.email,
        phone: "",
        userType: UserType.GOOGLE,
        role: Role.USER,
        password: "",
        oauthId: googleAuthDto.tokenId,
        username: result.name,
        avatar: {
          url: result.picture
        },
      }
      const user = await this.userService.create(userDto);
        if (user) {
          return {
            token: this.jwtService.sign(user.uniqueId),
            message: "Login Successful",
            data: user,
          };
        }

    }

  } catch(error) {
    throw new HttpException(error, HttpStatus.UNAUTHORIZED);
  }
  
 } 

 @Post('oauth/facebook')
 async facebookSiginin(@Body() facebookAuthDto) {
  try {
    const result = await this.authService.validateFacebook(facebookAuthDto.accessToken);
    if (result) {
      const picture = result.picture.data;
      const userDto: CreateUserDto = {
        email: result.email,
        phone: "",
        userType: UserType.FACEBOOK,
        role: Role.USER,
        password: "",
        oauthId: facebookAuthDto.tokenId,
        username: result.name,
        avatar: {
          url: picture.url,
          height: String(picture.height),
          width: String(picture.width),
        },
      }
      const user = await this.userService.create(userDto);
        if (user) {
          return {
            token: this.jwtService.sign(user.uniqueId),
            message: "Login Successful",
            data: user,
          };
        }

    }

  } catch (e) {
    throw new HttpException(e, HttpStatus.UNAUTHORIZED);
  }
  
 }

 @Post('register')
 @ApiOperation({ summary: 'User Register' })
 async register(@Body() registerDto: RegisterDto) {
  try {
    const user = await this.userService.create({
      ...registerDto,
      userType: UserType.EMAIL,
      role: Role.USER
    });
    return {
      msg: 'Register Successful',
      data: {
        user,
      }
    };

  } catch(e) {
   throw e;
  }
 }

 @Get('user')
 @ApiOperation({
  summary: 'Get Personal Information using token'
 }) 
 @ApiBearerAuth()
 @UseGuards(AuthGuard('jwt'))
  async info(@CurrentUser() user: User) {
    return user;
  }
}
