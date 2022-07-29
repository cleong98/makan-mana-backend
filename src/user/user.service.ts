import { Injectable } from '@nestjs/common';
import { Status, UserType } from '@prisma/client';
import { hashSync } from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor (private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    // hash user password
    try {
      if(createUserDto.password.length != 0) {
        createUserDto.password = hashSync(createUserDto.password);
      }
      
    const user = await this.findOneByEmail(
      createUserDto.email,
      {
      showPass: false,
    });
    console.log(user);
    if (user) {
      return {
        message: "this email already register",
        data: user.data,
      }
    }

    const result = await this.prisma.user.upsert({
      where: {
        email: createUserDto.email,
      },
       update: {},
      create: createUserDto,
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
    });
    return {
      message: "create success",
      data: result,
    }

    }catch (error) {
      return {
        message: "User already Register",
        error,
      }
    }
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

  async findOneByEmail(email: string,{status, showPass}: {status?: Status, showPass?: boolean} = { status: Status.ACTIVE, showPass: false}) {
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
          password: showPass,
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
