import { PartialType } from '@nestjs/swagger';
import { CreateGenderDto } from './create-gender.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class UpdateGenderDto extends PartialType(CreateGenderDto) {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ required: true, description: 'Gender ID', example: '123123131231', type: 'string' })
    uuid: string;

    @ApiProperty({ required: false, description: 'this gender want active?', example: 'true', type: 'boolean' })
    isAlive?: boolean;
}
