import { Injectable, Logger } from '@nestjs/common';

//------------ Import services ------------//
import { PrismaService } from '../../prisma';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly prismaService: PrismaService) {}
}
