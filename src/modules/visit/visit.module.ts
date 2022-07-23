import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

//------------ Import commons ------------//
import { VISIT_QUEUE } from '../../common/constant/queue.constant';
//------------ Import modules ------------//
import { PrismaModule } from '../prisma';
//------------ Import services ------------//
import { VisitService } from './commands/visit.service';
import { VisitQueueService } from './commands/visit.queue.service';
import { VisitQueueConsumer } from './commands/visit.consumer.service';

const httpControllers = [];
const commandHandlers = [VisitService, VisitQueueService, VisitQueueConsumer];

@Module({
  imports: [
    PrismaModule,
    BullModule.registerQueue({
      name: VISIT_QUEUE,
      defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: false,
      },
    }),
  ],
  controllers: [...httpControllers],
  providers: [...commandHandlers],
  exports: [VisitService, VisitQueueService],
})
export class VisitModule {}
