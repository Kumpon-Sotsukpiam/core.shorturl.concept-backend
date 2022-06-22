import { Injectable, Logger } from '@nestjs/common';

//------------ Import services ------------//
import { PrismaService } from '../../prisma';

@Injectable()
export class DomainService {
  private readonly logger = new Logger(DomainService.name);

  constructor(private readonly prismaService: PrismaService) {}
}
