import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';

@Injectable()
export class GenderService {

  constructor(private prisma: PrismaService) {}

  async create(createGenderDto: CreateGenderDto) {
    try {
      const data = await this.prisma.gender.upsert({
        where: {
          title: createGenderDto.title,
        },
        update: {},
        create: createGenderDto,
      });

      return {
        message: 'Create gender successful',
        data,
      }
      
    } catch (error) {
      return {
        message: 'Create gender failed',
        error,
      }
      
    }
  }

  async findGender(
    postWhereUniqueInput: Prisma.GenderWhereUniqueInput,
  ) {
    try {
      const data = await this.prisma.gender.findUnique({
        where: postWhereUniqueInput,
        select: {
          title: true,
          updatedAt: true,
          createdAt: true,
          uuid: true,
        }
      });
      return {
        messge: 'Get Gender successful',
        data,
      }
      
    } catch (error) {
      return {
        messge: 'Get Gender failed',
        error,
      }
    } 
  }

  async findAllGender() {
   try {

    const data = await this.prisma.gender.findMany({
      where: {
        isAlive: true,
      },
      select: {
        title: true,
        updatedAt: true,
        createdAt: true,
        uuid: true,
      }
    });
    return {
      message: 'Get all gender successful',
      data,
    }

   } catch (error) {
    return {
      messge: 'Get All gender fail',
      error,
    }
   }
  }

  async update(uuid: string,updateGenderDto: UpdateGenderDto) {
    try {
      const data = await this.prisma.gender.update({
        where: {
          uuid,
        },
        data: updateGenderDto,
        select: {
          title: true,
          updatedAt: true,
          uuid: true,
        }
      });

      return {
        message: 'Update successful',
        data,
      }

    } catch(error) {
      return {
        message: 'delete failed',
        error,
      }
    }
  }

  async remove(uuid: string) {
    try {
      const data = await this.prisma.gender.delete({ where: { uuid }});
      return {
        message: 'Delete gender successful',
        data,
      }
  

    } catch (error) {
      return {
        message: 'Delete Gender failed',
        error,
      }
    }
  }
}
