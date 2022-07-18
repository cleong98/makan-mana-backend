import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { GenderModule } from './gender/gender.module';

@Module({
  imports: [PrismaModule, GenderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
