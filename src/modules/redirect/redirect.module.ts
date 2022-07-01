import { forwardRef, Module } from '@nestjs/common';

//------------ Import modules ------------//
import { PrismaModule } from '../prisma';
import { LinkModule } from '../link/link.module';
import { VisitModule } from '../visit/visit.module';
//------------ Import controllers ------------//
import { RedirectController } from './redirect.controller';
//------------ Import services ------------//
import { RedirectService } from './commands/redirect.service';

const httpControllers = [RedirectController];
const commandHandlers = [RedirectService];

@Module({
  imports: [PrismaModule, LinkModule, VisitModule],
  controllers: [...httpControllers],
  providers: [...commandHandlers],
  exports: [RedirectService],
})
export class RedirectModule {}
