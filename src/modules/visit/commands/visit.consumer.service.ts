import { Logger } from '@nestjs/common';
import { IncomingHttpHeaders } from 'http';
import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueError,
  OnQueueProgress,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';
import { links } from '@prisma/client';
import * as geoip from 'geoip-lite';
import * as useragent from 'useragent';
import * as url from 'url';

//------------ Import constants ------------//
import { VISIT_QUEUE } from '../../../common/constant/queue.constant';
//------------ Import services ------------//
import { VisitService } from './visit.service';
import { removeWww } from 'src/common/utils';

@Processor(VISIT_QUEUE)
export class VisitQueueConsumer {
  private readonly logger = new Logger(VisitQueueConsumer.name);
  private readonly browsersList = [
    'IE',
    'Firefox',
    'Chrome',
    'Opera',
    'Safari',
    'Edge',
  ];
  private readonly osList = ['Windows', 'Mac OS', 'Linux', 'Android', 'iOS'];

  constructor(private readonly visitService: VisitService) {}

  @Process()
  async process(
    job: Job<{
      headers: IncomingHttpHeaders;
      realIP: string;
      referrer: any;
      link: links;
    }>,
  ) {
    const { realIP, referrer: _referrer, link } = job.data;
    const geo = geoip.lookup(realIP);
    const agent = useragent.parse(job.data.headers['user-agent']);
    const referrer = _referrer && removeWww(url.parse(_referrer).hostname);
    const [browser] = this.browsersList.filter((browser) =>
      agent['family'].toLowerCase().includes(browser.toLocaleLowerCase()),
    );
    const [os] = this.osList.filter((os) =>
      agent['os']['family'].toLowerCase().includes(os.toLocaleLowerCase()),
    );
    const country = geo && geo.country;
    const region = geo && geo.region;
    const city = geo && geo.city;

    return await this.visitService.create({
      id: link.id,
      referrer: referrer,
      os: os.toLowerCase().replace(/\s/gi, ''),
      browser: browser.toLowerCase(),
      country: country || 'unknown',
      region: region || 'unknown',
      city: city || 'unknown',
    });
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
