import { Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';

//------------ Import services ------------//
import { PrismaService } from '../../prisma';
//------------ Import DTOs ------------//
import { CreateLinkRequestDTO } from '../dtos/create-link-request.dto';

@Injectable()
export class LinkService {
  private readonly logger = new Logger(LinkService.name);

  constructor(private readonly prismaService: PrismaService) {}

  public async create(
    { target }: CreateLinkRequestDTO,
    { user_id }: { user_id: number },
  ) {
    const address = crypto.randomUUID();
    const link = await this.prismaService.links.create({
      data: {
        target,
        address: address,
        user_id: user_id,
      },
    });
    return link;
  }
  public async get({
    offset,
    limit,
    user_id,
  }: {
    offset: number;
    limit: number;
    user_id: number;
  }) {
    const total = await this.prismaService.links.count({
      where: { user_id },
    });
    const links = await this.prismaService.links.findMany({
      select: {
        id: true,
        address: true,
        description: true,
        expire_in: true,
        target: true,
        visit_count: true,
        created_at: true,
        updated_at: true,
      },
      where: {
        user_id,
      },
      skip: offset,
      take: limit,
      orderBy: {
        id: 'asc',
      },
    });
    return { data: links, total, limit, offset };
  }
  public async getByAddress(address: string) {
    return this.prismaService.links.findFirst({
      where: {
        address,
      },
    });
  }
}
