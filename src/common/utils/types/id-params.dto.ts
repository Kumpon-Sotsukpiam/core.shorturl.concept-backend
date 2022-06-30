import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class IdDTO {
  @ApiProperty({
    description: 'id field',
    default: 1,
  })
  @IsString()
  readonly id: string;
}
