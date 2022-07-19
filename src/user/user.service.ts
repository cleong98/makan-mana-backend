import { Injectable } from '@nestjs/common';
import { Status } from '@prisma/client';
import { hashSync } from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor (private prisma: PrismaService) {}
  create(createUserDto: CreateUserDto) {
    // hash user password
    createUserDto.password = hashSync(createUserDto.password);

    return this.prisma.user.upsert({
      where: {
        email: createUserDto.email,
      },
       update: {},
      create: createUserDto,
    });
  }

  async findAll(status: Status = Status.ACTIVE) {
   try {
    const data = await this.prisma.user.findMany({
      where: {
        status,
      },
      select: {
        uuid: true,
        email: true,
        phone: true,
        avatar: true,
        userType: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        gender: {
          select: {
            title: true,
          }
        }
      }
    })

    return {
      message: "Get all user successful",
      data,
    }

   } catch(error) {
    return {
      message: "Get all user failed",
      error,
    }
   }
  }

  async findOne(uuid: string,status: Status = Status.ACTIVE) {
    try {
      const data = await this.prisma.user.findFirstOrThrow({
        where: {
          status,
          uuid,
        },
        select: {
          uuid: true,
          email: true,
          phone: true,
          avatar: true,
          userType: true,
          role: true,
          createdAt: true,
          updatedAt: true,
          gender: {
            select: {
              title: true,
            }
          }
        }
      })
  
      return {
        message: "Get user successful",
        data,
      }
  
     } catch(error) {
      return {
        message: "Get user failed",
        error,
      }
     }
  }

  async findOneByEmail(email: string, status: Status = Status.ACTIVE) {
    try {
      const data = await this.prisma.user.findFirst({
        where: {
          status,
          email,
        },
        select: {
          uuid: true,
          email: true,
          phone: true,
          avatar: true,
          userType: true,
          role: true,
          createdAt: true,
          updatedAt: true,
          password: true,
          gender: {
            select: {
              title: true,
            }
          }
        }
      })
      return {
        message: "Get user successful",
        data,
      }
  
     } catch(error) {
      return {
        message: "Get user failed",
        error,
      }
     }
  }

  async update(uuid: string, updateUserDto: UpdateUserDto) {
    try {
      const data = await this.prisma.user.update({
        where: {
        uuid
        },
        data: updateUserDto,
        select: {
          uuid: true,
          email: true,
          phone: true,
          avatar: true,
          userType: true,
          role: true,
          createdAt: true,
          updatedAt: true,
          gender: {
            select: {
              title: true,
            }
          }
        }
      })
  
      return {
        message: "Update user successful",
        data,
      }
  
     } catch(error) {
      return {
        message: "Update user failed",
        error,
      }
     }
  }

  async remove(uuid: string) {
    try {
      const data = await this.prisma.user.delete({
        where: {
        uuid
        },
        select: {
          uuid: true,
          email: true,
          phone: true,
          avatar: true,
          userType: true,
          role: true,
          createdAt: true,
          updatedAt: true,
          gender: {
            select: {
              title: true,
            }
          }
        }
      })
  
      return {
        message: "Delete user successful",
        data,
      }
  
     } catch(error) {
      return {
        message: "Delete user failed",
        error,
      }
     }
  }
}