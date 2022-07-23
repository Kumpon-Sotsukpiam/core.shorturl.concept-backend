import { Injectable, Logger } from '@nestjs/common';

//------------ Import services ------------//
import { PrismaService } from '../../prisma';
//------------ Import interfaces ------------//
import { CreateVisitInterface } from '../interfaces/create-visit.interface';

@Injectable()
export class VisitService {
  private readonly logger = new Logger(VisitService.name);
  constructor(private readonly prismaService: PrismaService) {}

  public async create(params: CreateVisitInterface) {
    const data = {
      ...params,
      country: params.country,
      referrer: params.referrer,
    };
    const browser_type = `br_${data.browser}`;
    const os_type = `os_${data.os}`;
    const transactions = [];
    const visit = await this.prismaService.visits.findFirst({
      select: { id: true },
      where: {
        link_id: params.id,
        countries: data.country,
        regiones: data.region,
        cities: data.city,
      },
    });
    transactions.push(
      this.prismaService.links.update({
        data: { visit_count: { increment: 1 } },
        where: { id: params.id },
      }),
    );
    if (visit) {
      transactions.push(
        this.prismaService.visits.update({
          where: { id: visit.id },
          data: {
            [browser_type]: { increment: 1 },
            [os_type]: { increment: 1 },
            total: { increment: 1 },
            updated_at: new Date().toISOString(),
          },
        }),
      );
    } else {
      transactions.push(
        this.prismaService.visits.create({
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
        }),
      );
    }
    return this.prismaService.$transaction(transactions);
  }
}
