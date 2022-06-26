import { forwardRef, Module } from '@nestjs/common';

//------------ Import modules ------------//
import { PrismaModule } from '../../modules/prisma';
import { AuthModule } from '../auth/auth.module';
//------------ Import controllers ------------//
import { UserController } from './user.controller';
//------------ Import services ------------//
import { UserService } from './commands/user.service';

const httpControllers = [UserController];
const commandHandlers = [UserService];

@Module({
  imports: [PrismaModule, forwardRef(() => AuthModule)],
  controllers: [...httpControllers],
  providers: [...commandHandlers],
  exports: [UserService],
})
export class UserModule {}
