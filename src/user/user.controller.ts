import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FirebaseService } from 'src/firebase/firebase.service';
import { Message } from 'firebase-admin/lib/messaging/messaging-api';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService, private readonly firebaseService: FirebaseService) {}


  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.userService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.userService.findOne(uuid);
  }

  @Patch(':uuid')
  update(@Param('uuid') uuid: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(uuid, updateUserDto);
  }

  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.userService.remove(uuid);
  }

  // @Post('test')
  // testNotification() {
  //   const message: Message = {
  //     token: 'dlt34W_MTRuFUSvDm9zzyI:APA91bHjUFGg74olN6WOEenkz-sJ1L7Qusw6vFh4WyIMZa8j8BqQ40f3usVbFGbDP36zURQWpcq4i-x_xiEqklq4hDavTWYxtcWUMWYK1S39XTFyneaY2rv6f6h1ZIgNAfTqhkwYvIlr',
  //     data: {
  //         url: 'background',
  //     },
  //     notification: {
  //         title: 'close app title',
  //         body: 'close app body',
  //     },
  //     android: {
  //         priority: "high",
  //         notification: {
  //             channelId: "makan_mana_message_channel",
  //         }
          
  //     }
  // };
  //   return this.firebaseService.sendMessaging(message);
  // }
}
