import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';
import { IsPasswordValid } from '../../../common/validations/password.validator';

export class SignUpRequestDTO {
  @ApiProperty({
    description: 'Email field',
    default: '',
  })
  @Transform(({ value }) => value?.toLowerCase().trim())
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    description: 'Password field',
    default: '',
  })
  @IsPasswordValid()
  readonly password: string;

  @ApiProperty({
    description: 'Firstname field',
    default: '',
  })
  @IsString()
  readonly first_name: string;

  @ApiProperty({
    description: 'Lastname field',
    default: '',
  })
  @IsString()
  readonly last_name: string;
}
