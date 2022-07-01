import { forwardRef, Module } from '@nestjs/common';

//------------ Import modules ------------//
import { PrismaModule } from '../prisma';
//------------ Import services ------------//
import { VisitService } from './commands/visit.service';

const httpControllers = [];
const commandHandlers = [VisitService];

@Module({
  imports: [PrismaModule],
  controllers: [...httpControllers],
  providers: [...commandHandlers],
  exports: [VisitService],
})
export class VisitModule {}
