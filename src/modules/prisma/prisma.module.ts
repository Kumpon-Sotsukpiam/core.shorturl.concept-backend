import { Global, Module } from '@nestjs/common';
//------------ Import services ------------//
import { PrismaService } from './prisma.service';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
