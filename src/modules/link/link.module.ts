import { forwardRef, Module } from '@nestjs/common';

//------------ Import modules ------------//
import { PrismaModule } from '../prisma';
//------------ Import controllers ------------//
import { LinkController } from './link.controller';
//------------ Import services ------------//
import { LinkService } from './commands/link.service';

const httpControllers = [LinkController];
const commandHandlers = [LinkService];

@Module({
  imports: [PrismaModule],
  controllers: [...httpControllers],
  providers: [...commandHandlers],
  exports: [LinkService],
})
export class LinkModule {}
