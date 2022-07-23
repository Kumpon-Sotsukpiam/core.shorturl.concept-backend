import { Controller, Delete, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
//------------ Import services ------------//
import { DomainService } from './commands/domain.service';
//------------ Import DTOs ------------//

@Controller({ path: 'api/domain' })
@ApiTags('Domain')
export class DomainController {
  constructor(private readonly domainService: DomainService) {}

  @Post('/')
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async createDomain() {}

  @Delete('/:id')
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async deleteDomain() {}
}
