import { forwardRef, Module } from '@nestjs/common';

//------------ Import modules ------------//
import { PrismaModule } from '../prisma';
//------------ Import controllers ------------//
import { DomainController } from './domain.controller';
//------------ Import services ------------//
import { DomainService } from './commands/domain.service';

const httpControllers = [DomainController];
const commandHandlers = [DomainService];

@Module({
  imports: [PrismaModule],
  controllers: [...httpControllers],
  providers: [...commandHandlers],
  exports: [DomainService],
})
export class DomainModule {}
