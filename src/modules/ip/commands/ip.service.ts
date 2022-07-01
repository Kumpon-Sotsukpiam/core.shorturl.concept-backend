import { Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';

//------------ Import services ------------//
import { PrismaService } from '../../prisma';

@Injectable()
export class IPService {
  private readonly logger = new Logger(IPService.name);

  constructor(private readonly prismaService: PrismaService) {}
}
