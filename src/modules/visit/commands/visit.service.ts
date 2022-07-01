import { Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';

//------------ Import services ------------//
import { PrismaService } from '../../prisma';
//------------ Import interfaces ------------//
import { createVisitInterface } from '../interfaces/create-visit.interface';

@Injectable()
export class VisitService {
  private readonly logger = new Logger(VisitService.name);
  private readonly browsersList = [
    'IE',
    'Firefox',
    'Chrome',
    'Opera',
    'Safari',
    'Edge',
  ];
  private readonly osList = ['Windows', 'Mac OS', 'Linux', 'Android', 'iOS'];

  constructor(private readonly prismaService: PrismaService) {}

  public async add(data: any) {
    this.logger.debug({ data });
  }
  private filterInBrowser() {}
  private filterInOS() {}
  private async create(params: createVisitInterface) {
    const data = {
      ...params,
      country: params.country.toLowerCase(),
      referrer: params.referrer.toLowerCase(),
    };
    const browser_type = `br_${data.browser}`;
    const os_type = `br_${data.os}`;
    const visit = await this.prismaService.visits.findFirst({
      where: { link_id: params.id },
    });
    if (visit) {
      await this.prismaService.visits.update({
        where: { id: visit.id },
        data: {
          [browser_type]: visit[browser_type] + 1,
          [os_type]: visit[os_type] + 1,
          total: visit.total + 1,
          updated_at: new Date().toISOString(),
        },
      });
    } else {
      await this.prismaService.visits.create({
        data: {
          [browser_type]: 1,
          [os_type]: 1,
          total: 1,
          link_id: data.id,
          countries: {
            [data.country]: 1,
          },
          referrers: {
            [data.referrer]: 1,
          },
        },
      });
    }
    return visit;
  }
}
