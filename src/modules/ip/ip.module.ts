import { forwardRef, Module } from '@nestjs/common';

//------------ Import modules ------------//
import { PrismaModule } from '../prisma';
//------------ Import services ------------//
import { IPService } from './commands/ip.service';

const httpControllers = [];
const commandHandlers = [IPService];

@Module({
  imports: [PrismaModule],
  controllers: [...httpControllers],
  providers: [...commandHandlers],
  exports: [IPService],
})
export class IPModule {}
