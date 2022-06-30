import { ApiProperty } from '@nestjs/swagger';
import { IsUrl, MinLength, MaxLength } from 'class-validator';

export class CreateLinkRequestDTO {
  @ApiProperty({
    description: 'target field',
    default: '',
  })
  @IsUrl({}, { message: 'URL is not valid.' })
  @MinLength(1)
  @MaxLength(2040, { message: 'Maximum URL length is 2040.' })
  readonly target: string;
}
