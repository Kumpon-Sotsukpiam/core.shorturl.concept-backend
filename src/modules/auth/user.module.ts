import { forwardRef, Module } from '@nestjs/common';

//------------ Import modules ------------//
import { PrismaModule } from '../../modules/prisma';
//------------ Import controllers ------------//
import { AuthController } from './auth.controller';
//------------ Import services ------------//
import { AuthService } from './commands/auth.service';

const httpControllers = [AuthController];
const commandHandlers = [AuthService];

@Module({
  imports: [PrismaModule],
  controllers: [...httpControllers],
  providers: [...commandHandlers],
  exports: [AuthService],
})
export class AuthModule {}
