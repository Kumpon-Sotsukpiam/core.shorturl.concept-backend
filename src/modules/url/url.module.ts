import { forwardRef, Module } from '@nestjs/common';

//------------ Import modules ------------//
import { PrismaModule } from '../prisma';
//------------ Import controllers ------------//
import { UrlController } from './url.controller';
//------------ Import services ------------//
import { UrlService } from './commands/url.service';

const httpControllers = [UrlController];
const commandHandlers = [UrlService];

@Module({
  imports: [PrismaModule],
  controllers: [...httpControllers],
  providers: [...commandHandlers],
  exports: [UrlService],
})
export class UrlModule {}
