import {
  Controller,
  Get,
  HttpStatus,
  Next,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response, NextFunction } from 'express';
import * as isbot from 'isbot';

//------------ Import services ------------//
import { RedirectService } from './commands/redirect.service';
import { LinkService } from '../link/commands/link.service';
//------------ Import Decorators ------------//
import { Public } from '../../common/decorators';
//------------ Import DTOs ------------//
import { IdDTO } from '../../common/utils/types/id-params.dto';
import { removeWww } from '../../common/utils';
import { ConfigService } from '@nestjs/config';

@Controller({ path: '/' })
@ApiTags('Redirect')
export class RedirectController {
  constructor(
    private readonly redirectService: RedirectService,
    private readonly configSerice: ConfigService,
    private readonly linkService: LinkService,
  ) {}

  @Public()
  @Get('/:id')
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async redirect(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
    @Param() { id }: IdDTO,
  ) {
    const isBot = isbot(req.headers['user-agent']);

    // 1. if custom domain, get domain info
    const host = removeWww(req.headers.host);
    const domain = null;

    // 2. get link
    const address = id.replace('+', '');
    const link = await this.linkService.getByAddress(id);

    // 3. when no link, if has domain redirect to domain's homepage
    // otherwise redirect to 404
    if (!link) {
      return res.redirect(301, '/404');
    }
    // 8
    return res.redirect(link.target);
  }
}
