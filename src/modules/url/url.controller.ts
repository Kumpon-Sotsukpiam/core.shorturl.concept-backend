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
import { UrlService } from './commands/url.service';
//------------ Import DTOs ------------//

@Controller({ path: 'api/url' })
@ApiTags('URL')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post('/submit')
  @ApiResponse({
    status: HttpStatus.CREATED,
  })
  async shortener() {}

  @Post('/deleteurl')
  @ApiResponse({
    status: HttpStatus.CREATED,
  })
  async deleteUserLink() {}

  @Post('/geturls')
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async getUserLinks() {}

  @Post('/customdomain')
  @ApiResponse({
    status: HttpStatus.CREATED,
  })
  async setCustomDomain() {}

  @Delete('/customdomain')
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async deleteCustomDomain() {}

  @Get('/stats')
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async getLInkStats() {}

  @Post('/requesturl')
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async goToLink() {}

  @Post('/report')
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async reportLink() {}

  @Post('/admin/ban')
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async ban() {}
}
