import { Injectable, Logger } from '@nestjs/common';

//------------ Import services ------------//
import { PrismaService } from '../../prisma';
//------------ Import interfaces ------------//
import { createVisitInterface } from '../interfaces/create-visit.interface';

@Injectable()
export class VisitService {
  private readonly logger = new Logger(VisitService.name);
  constructor(private readonly prismaService: PrismaService) {}

  public async create(params: createVisitInterface) {
    const data = {
      ...params,
      country: params.country,
      referrer: params.referrer,
    };
    const browser_type = `br_${data.browser}`;
    const os_type = `os_${data.os}`;
    const visit = await this.prismaService.visits.findFirst({
      where: {
        link_id: params.id,
        countries: data.country,
        regiones: data.region,
        cities: data.city,
      },
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
          countries: data.country,
          regiones: data.region,
          cities: data.city,
          referrers: data.referrer,
        },
      });
    }
    return visit;
  }
}
