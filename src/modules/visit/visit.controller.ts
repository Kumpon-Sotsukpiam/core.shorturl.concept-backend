import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
//------------ Import services ------------//
import { VisitService } from './commands/visit.service';
//------------ Import DTOs ------------//
import { IdNumberDTO } from '../../common/utils/types/id-params.dto';
//------------ Import utils ------------//
//------------ Import decorators ------------//

@Controller({ path: 'api/visit' })
@ApiTags('Visit')
@ApiTags('Authentication')
@ApiBearerAuth('Authorization')
export class VisitController {
  constructor(private readonly visitService: VisitService) {}
  @Get('/:id/stats')
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async getStats(@Param() { id }: IdNumberDTO) {
    return this.visitService.stats(id);
  }
}
