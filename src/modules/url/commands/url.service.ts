import { Injectable, Logger } from '@nestjs/common';

//------------ Import services ------------//
import { PrismaService } from '../../prisma';

@Injectable()
export class UrlService {
  private readonly logger = new Logger(UrlService.name);

  constructor(private readonly prismaService: PrismaService) {}
}
