import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
//------------ Import services ------------//
import { LinkService } from './commands/link.service';
//------------ Import DTOs ------------//
import { CreateLinkRequestDTO } from './dtos/create-link-request.dto';
import { UpdateLinkRequestDTO } from './dtos/update-link-request.dto';
import { IdNumberDTO } from '../../common/utils/types/id-params.dto';
//------------ Import utils ------------//
import { PaginationParamsDTO } from '../../common/utils/types/pagination-params.dto';
//------------ Import decorators ------------//
import { GetCurrentUser } from '../../common/decorators/get-current-user.decorator';
@Controller({ path: 'api/link' })
@ApiTags('Link')
@ApiTags('Authentication')
@ApiBearerAuth('Authorization')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Get('/')
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async getLink(
    @GetCurrentUser() user,
    @Query() { offset, limit }: PaginationParamsDTO,
  ) {
    return this.linkService.get({
      offset: Number(offset),
      limit: Number(limit),
      user_id: user.id,
    });
  }

  @Post('/')
  @ApiResponse({
    status: HttpStatus.CREATED,
  })
  async createLink(@Body() input: CreateLinkRequestDTO, @Req() req) {
    return this.linkService.create(input, { user_id: req.user.id });
  }

  @Patch('/:id')
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async updateLink(
    @Param() { id }: IdNumberDTO,
    @Body() input: UpdateLinkRequestDTO,
  ) {
    return this.linkService.update(Number(id), input);
  }

  @Delete('/:id')
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @HttpCode(HttpStatus.OK)
  async deleteLink(@Param() { id }: IdNumberDTO) {
    return this.linkService.deleteById(Number(id));
  }

  // @Get('/:id/stats')
  // @ApiResponse({
  //   status: HttpStatus.OK,
  // })
  // async getStats(
  //   @Param() { id }: IdNumberDTO,
  // ) { }

  // @Post('/:id/protected')
  // @ApiResponse({
  //   status: HttpStatus.OK,
  // })
  // async redirectProtected(
  //   @Param() { id }: IdNumberDTO,
  // ) { }

  // @Post('/report')
  // @ApiResponse({
  //   status: HttpStatus.OK,
  // })
  // async getReport() { }

  // @Post('/admin/ban/:id')
  // @ApiResponse({
  //   status: HttpStatus.OK,
  // })
  // async createBan(
  //   @Param() { id }: IdNumberDTO,
  // ) { }
}
