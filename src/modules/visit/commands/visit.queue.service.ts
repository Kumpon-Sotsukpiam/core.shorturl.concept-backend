import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { links } from '@prisma/client';
import { Queue } from 'bull';
import { Request } from 'express';

//------------ Import commons ------------//
import { VISIT_QUEUE } from '../../../common/constant/queue.constant';

@Injectable()
export class VisitQueueService {
  private readonly logger = new Logger();

  constructor(
    @InjectQueue(VISIT_QUEUE)
    private visitQueue: Queue<any>,
  ) {}

  public async add({ req, link }: { req: Request; link: links }) {
    const job = await this.visitQueue.add({
      headers: req.headers,
      realIP: req.ip,
      referrer: req.get('Referrer'),
      link,
    });
    return job;
  }
}
