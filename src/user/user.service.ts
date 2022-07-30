import { ConflictException, HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ImageRef, User, UserType } from '@prisma/client';
import { compareSync, hashSync } from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor (private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {

    const user: User = await this.findOneByEmail(createUserDto.email,{ showPass: true , userType: createUserDto.userType});
    if (user) {
      if(user.userType === UserType.EMAIL) {
        if (!compareSync(createUserDto.password, user.password)) {
          throw new UnauthorizedException({
              msg: "Password Incorrect"
          })
        }
        delete user.password;
        throw new ConflictException({
          msg: "User already available",
          data: {user},
        });
      }
    }

    // if not email register
    if (createUserDto.userType !== UserType.EMAIL) {
      const userType = createUserDto.userType;
      let image;
      if (userType == UserType.GOOGLE) {
        image = await this.prisma.image.create({
          data: {
            ref: ImageRef.USER,
            url: createUserDto.avatar.url,
          }
        });
      } else if (userType == UserType.FACEBOOK) {
        image = await this.prisma.image.create({
          data: {
            ref: ImageRef.USER,
            url: createUserDto.avatar.url,
            originSize: [createUserDto.avatar.width, createUserDto.avatar.height]
          }
        });
      }
      delete createUserDto.avatar;
      return this.prisma.user.create({
        data: {
          ...createUserDto,
          avatar: {
            connect: {
              id: image.id,
            }
          }
        },
        select: {
          uniqueId: true,
          email: true,
          phone: true,
          userType: true,
          role: true,
          createdAt: true,
          updatedAt: true,
          avatar: {
            select: {
              url: true,
            }
          }
        }
      });
    }

    // hash user password
    if(createUserDto.password.length != 0) {
      createUserDto.password = hashSync(createUserDto.password);
    }
      
    return this.prisma.user.create({
      data: createUserDto,
      select: {
        uniqueId: true,
        email: true,
        phone: true,
        userType: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        avatar: {
          select: {
            url: true,
          }
        }
      }
    });
  
  }

  async findAll(isActive: boolean = true) {
   try {
    return this.prisma.user.findMany({
      where: {
        isActive
      },
      select: {
        uniqueId: true,
        email: true,
        phone: true,
        avatar: true,
        userType: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      }
    })

   } catch(error) {
    return error;
   }
  }

  async findOne(uniqueId: string, isActive: boolean = true) {
    try {
     return this.prisma.user.findFirstOrThrow({
        where: {
          isActive,
          uniqueId,
        },
        select: {
          uniqueId: true,
          email: true,
          phone: true,
          avatar: true,
          userType: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        }
      });
  
     } catch(error) {
      return error;
     }
  }

  async findOneByEmail(email: string,{isActive, showPass, userType}: {isActive?: boolean, showPass?: boolean, userType?: UserType} = { isActive: true, showPass: false, userType: UserType.EMAIL}) {
    try {
      const data = await this.prisma.user.findFirst({
        where: {
          isActive,
          email,
          userType,
        },
        select: {
          uniqueId: true,
          email: true,
          phone: true,
          avatar: true,
          userType: true,
          role: true,
          createdAt: true,
          updatedAt: true,
          password: showPass,
        }
      })
      return data;
  
     } catch(error) {
      return error;
     }
  }

  async update(uniqueId: string, updateUserDto: UpdateUserDto) {
    try {
      return this.prisma.user.update({
        where: {
        uniqueId
        },
        data: updateUserDto,
        select: {
          uniqueId: true,
          email: true,
          phone: true,
          avatar: true,
          userType: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        }
      })
     } catch(error) {
        return error;
     }
  }

  async remove(uniqueId: string) {
    try {
      return this.prisma.user.delete({
        where: {
        uniqueId
        },
        select: {
          uniqueId: true,
          email: true,
          phone: true,
          avatar: true,
          userType: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        }
      })
     } catch(error) {
      return error;
     }
  }
}
