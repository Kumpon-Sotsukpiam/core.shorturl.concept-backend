import { Module } from '@nestjs/common';
import { AnyOtherModuleService } from './commands/any-other-module.service';

@Module({
  providers: [AnyOtherModuleService],
  exports: [AnyOtherModuleService],
})
export class AnyOtherModuleModule {}
