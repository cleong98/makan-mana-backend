import { ApiProperty } from '@nestjs/swagger';
export class GenderEntity {
   @ApiProperty()
   message: string

   @ApiProperty({
    type: 'object',
    properties: {
        uuid: {
            type: 'string',
            description: 'uuid of gender',
        },
        title: {
            type: 'string',
            description: 'gender name',
        },
        createAt: {
            type: 'date-time',
            description: 'gender create DateTime',
        },
        updateAt: {
            type: 'date-time',
            description: 'gender update title DateTime'
        }

    }
   })
   data: {}
}
