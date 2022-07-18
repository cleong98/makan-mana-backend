import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
export class CreateGenderDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ required: true, description: 'Gender name', example: 'Male', type: 'string' })
    title: string;
}
