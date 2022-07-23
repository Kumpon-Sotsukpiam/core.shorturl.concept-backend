import { ApiProperty } from '@nestjs/swagger';

export class DeleteUserRequestDTO {
  @ApiProperty({
    description: 'Password field',
    default: '',
  })
  readonly password: string;
}
