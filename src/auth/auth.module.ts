import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  imports: [
    UserModule, 
    PassportModule, 
    JwtModule,
    HttpModule,
    JwtModule.registerAsync({
      useFactory() {
        return {
          secret: process.env.SECRET,
        }
      }
    })
  ],
})
export class AuthModule {}
