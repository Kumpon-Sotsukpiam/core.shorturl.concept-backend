import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
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
  async updateLink() {}

  @Delete('/:id')
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async deleteLink() {}

  @Get('/:id/stats')
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async getStats() {}

  @Post('/:id/protected')
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async redirectProtected() {}

  @Post('/report')
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async getReport() {}

  @Post('/admin/ban/:id')
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async createBan() {}
}
