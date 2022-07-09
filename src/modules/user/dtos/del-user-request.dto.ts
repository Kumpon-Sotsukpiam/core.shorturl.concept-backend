import { ApiProperty } from '@nestjs/swagger';
import { IsPasswordValid } from '../../../common/validations/password.validator';

export class DeleteUserRequestDTO {
  @ApiProperty({
    description: 'Password field',
    default: '',
  })
  // @IsPasswordValid()
  readonly password: string;
}
