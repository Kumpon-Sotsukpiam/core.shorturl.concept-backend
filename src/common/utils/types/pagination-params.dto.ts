import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min, IsOptional, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class PaginationParamsDTO {
  @ApiProperty({
    description: 'offset field',
    default: 0,
  })
  @IsOptional()
  @Min(0)
  @Transform(({ value }) => Number(value))
  @IsNumber()
  readonly offset?: number;

  @ApiProperty({
    description: 'limit field',
    default: 1,
  })
  @IsOptional()
  @Min(1)
  @Transform(({ value }) => Number(value))
  @IsNumber()
  readonly limit?: number;

  @ApiProperty({
    description: 'search field',
    default: '',
  })
  @IsOptional()
  @IsString()
  readonly search?: string;
}
