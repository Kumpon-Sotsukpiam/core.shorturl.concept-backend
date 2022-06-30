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
  public async get(offset: number, limit: number) {
    const links = await this.prismaService.links.findMany({
      skip: offset,
      take: limit,
      orderBy: {
        id: 'asc',
      },
    });
    return links;
  }
  public async getByAddress(address: string) {
    return this.prismaService.links.findFirst({
      where: {
        address,
      },
    });
  }
}
