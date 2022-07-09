import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class IdNumberDTO {
  @ApiProperty({
    description: 'id field',
    default: 1,
  })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  readonly id: number;
}

export class UUIdDTO {
  @ApiProperty({
    description: 'uuid field',
    default: '',
  })
  @IsString()
  readonly id: string;
}
