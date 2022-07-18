import { Module } from '@nestjs/common';
import { GenderService } from './gender.service';
import { GenderController } from './gender.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [GenderController],
  providers: [GenderService],
  imports: [PrismaModule],
})
export class GenderModule {}
