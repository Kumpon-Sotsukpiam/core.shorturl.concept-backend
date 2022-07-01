import { Logger } from '@nestjs/common';
import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueError,
  OnQueueProgress,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';

//------------ Import constants ------------//
import { VISIT_QUEUE } from '../../../common/constant/queue.constant';
//------------ Import services ------------//
import { VisitService } from './visit.service';

@Processor(VISIT_QUEUE)
export class VisitQueueConsumer {
  private readonly logger = new Logger(VisitQueueConsumer.name);

  constructor(private readonly visitService: VisitService) {}

  @Process()
  async process(job: Job<any>) {
    try {
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  @OnQueueActive()
  onActive(job: Job) {
    this.logger.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }
  @OnQueueProgress()
  onProgress(job: Job) {
    this.logger.debug(`Processing progress ${job.progress}`);
  }
  @OnQueueCompleted()
  onCompleted(job: Job) {
    this.logger.log(`Completed job ${job.id} of type ${job.name}`);
  }
  @OnQueueError()
  onError(job: Job) {
    this.logger.error(`Error job ${job.id} of type ${job.name}`);
  }
}
