import { Injectable, Logger } from '@nestjs/common';

//------------ Import services ------------//
import { PrismaService } from '../../prisma';
//------------ Import interfaces ------------//
import { CreateVisitInterface } from '../interfaces/create-visit.interface';
//------------ Import utils ------------//
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
    const transactions = [];

    transactions.push(
      this.prismaService.links.update({
        data: { visit_count: { increment: 1 } },
        where: { id: params.id },
      }),
    );
    transactions.push(
      this.prismaService.visits.create({
        data: {
          ip: data.ip,
          link_id: data.id,
          browser_name: data.browser_name,
          browser_version: data.browser_version,
          os_name: data.os_name,
          os_version: data.os_version,
          country: data.country,
          region: data.region,
          city: data.city,
          referer: data.referrer,
        },
      }),
    );
    return this.prismaService.$transaction(transactions);
  }
  public async stats(id: number) {}
}
