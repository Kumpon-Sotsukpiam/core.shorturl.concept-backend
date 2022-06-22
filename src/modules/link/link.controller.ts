import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
//------------ Import services ------------//
import { LinkService } from './commands/link.service';
//------------ Import DTOs ------------//

@Controller({ path: 'link' })
@ApiTags('Link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Get('/')
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async getLink() {}

  @Post('/')
  @ApiResponse({
    status: HttpStatus.CREATED,
  })
  async createLink() {}

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
