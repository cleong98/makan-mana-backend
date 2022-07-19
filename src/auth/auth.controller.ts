import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role, UserType } from '@prisma/client';
import { UserType as User } from 'src/user/type/user-type';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorator/current-user.decorator';
import { LoginDto } from './dto/login.dto';
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
 login(@Body() loginDto: LoginDto, @CurrentUser() user: User) {
  return {
    token: this.jwtService.sign(user.uuid),
    data: user,
  };
 }

 @Post('register')
 @ApiOperation({ summary: 'User Register' })
 register(@Body() registerDto: RegisterDto) {
  return this.userService.create({
    ...registerDto,
    userType: UserType.EMAIL,
    role: Role.USER,
  });
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

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}