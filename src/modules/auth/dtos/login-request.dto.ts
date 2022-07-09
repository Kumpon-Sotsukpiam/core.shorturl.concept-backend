import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { IsPasswordValid } from '../../../common/validations/password.validator';

export class LoginRequestDTO {
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
}
