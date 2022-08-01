import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { FirebaseModule } from 'src/firebase/firebase.module';

@Module({
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  imports: [PrismaModule, FirebaseModule],
  exports: [UserService],
})
export class UserModule {}
