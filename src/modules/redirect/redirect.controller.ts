import {
  Controller,
  Get,
  HttpStatus,
  Logger,
  Next,
  Param,
  Req,
  Res,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response, NextFunction } from 'express';
import * as isbot from 'isbot';

//------------ Import services ------------//
import { RedirectService } from './commands/redirect.service';
import { LinkService } from '../link/commands/link.service';
import { VisitService } from '../visit/commands/visit.service';
//------------ Import Decorators ------------//
import { Public } from '../../common/decorators';
//------------ Import DTOs ------------//
import { IdDTO } from '../../common/utils/types/id-params.dto';
import { removeWww } from '../../common/utils';
import { ConfigService } from '@nestjs/config';

@Controller({ path: '/' })
@ApiTags('Redirect')
export class RedirectController {
  private readonly logger = new Logger(RedirectController.name);

  constructor(
    private readonly redirectService: RedirectService,
    private readonly configSerice: ConfigService,
    private readonly linkService: LinkService,
    private readonly visitService: VisitService,
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
    this.logger.debug(req.ip);
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

    // 4. if link is protected, redirect to password page
    if (link.password) {
      return res.redirect(`/protected/${link.uuid}`);
    }

    // 5. create link visit
    if (true) {
      this.visitService.add({
        headers: req.headers,
        realIp: req.ip,
        referrer: req.get('Referrer'),
        link,
      });
    }

    // 6. redirect to targer.
    return res.redirect(link.target);
  }
}
