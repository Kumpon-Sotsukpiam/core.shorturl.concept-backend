import { forwardRef, Module } from '@nestjs/common';

//------------ Import modules ------------//
import { PrismaModule } from '../prisma';
import { LinkModule } from '../link/link.module';
//------------ Import controllers ------------//
import { RedirectController } from './redirect.controller';
//------------ Import services ------------//
import { RedirectService } from './commands/redirect.service';

const httpControllers = [RedirectController];
const commandHandlers = [RedirectService, LinkModule];

@Module({
  imports: [PrismaModule, LinkModule],
  controllers: [...httpControllers],
  providers: [...commandHandlers],
  exports: [RedirectService],
})
export class RedirectModule {}
