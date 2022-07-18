import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GenderService } from './gender.service';
import { CreateGenderDto } from './dto/create-gender.dto';
import { UpdateGenderDto } from './dto/update-gender.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { GenderEntity } from './entities/gender.entity';

@Controller('gender')
@ApiTags('Gender')
export class GenderController {
  constructor(private readonly genderService: GenderService) {}

  @Post()
  @ApiCreatedResponse({ type: GenderEntity })
  create(@Body() createGenderDto: CreateGenderDto) {
    return this.genderService.create(createGenderDto);
  }

  @Get()
  @ApiCreatedResponse({ type: GenderEntity })
  findAll() {
    return this.genderService.findAllGender();
  }

  @Get(':uuid')
  @ApiCreatedResponse({ type: GenderEntity })
  findOne(@Param('uuid') uuid: string) {
    return this.genderService.findGender({ uuid});
  }

  @Patch(':uuid')
  @ApiCreatedResponse({ type: GenderEntity })
  update(@Param('uuid') uuid: string, @Body() updateGenderDto: UpdateGenderDto) {
    return this.genderService.update(uuid, updateGenderDto);
  }

  @Delete(':uuid')
  @ApiCreatedResponse({ type: GenderEntity })
  remove(@Param('uuid') uuid: string) {
    return this.genderService.remove(uuid);
  }
}
