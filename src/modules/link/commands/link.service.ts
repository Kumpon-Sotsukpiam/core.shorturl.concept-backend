import { Injectable, Logger } from '@nestjs/common';

//------------ Import services ------------//
import { PrismaService } from '../../prisma';

@Injectable()
export class LinkService {
  private readonly logger = new Logger(LinkService.name);

  constructor(private readonly prismaService: PrismaService) {}
}
