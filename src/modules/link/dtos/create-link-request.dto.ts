import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsUrl,
  MinLength,
  MaxLength,
  IsDate,
  IsOptional,
  Matches,
} from 'class-validator';

import { PreservedURLsValid } from '../../../common/validations/preservedUrls.validator';

export class CreateLinkRequestDTO {
  @ApiProperty({
    description: 'target field',
    default: '',
  })
  @MinLength(1)
  @MaxLength(2040, { message: 'Maximum URL length is 2040.' })
  @IsUrl({}, { message: 'URL is not valid.' })
  readonly target: string;

  @ApiProperty({
    description: 'address field',
    default: '',
  })
  @MinLength(1)
  @MaxLength(64, { message: 'Maximum address length is 64.' })
  @Transform((value) => value.value.trim())
  @Matches(/^[a-zA-Z0-9-_]+$/g, { message: 'Custom URL is not valid' })
  @PreservedURLsValid({ message: "You can't use this custom URL." })
  @IsOptional()
  readonly address?: string;

  @ApiProperty({
    description: 'password field',
    default: '',
  })
  @MinLength(3)
  @MaxLength(64, { message: 'Maximum address length is 64.' })
  @IsOptional()
  readonly password?: string;

  @ApiProperty({
    description: 'password field',
    default: new Date(),
  })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  readonly expire_in?: Date;
}
