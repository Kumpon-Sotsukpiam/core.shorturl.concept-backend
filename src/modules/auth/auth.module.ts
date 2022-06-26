import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

//------------ Import modules ------------//
import { PrismaModule } from '../prisma';
import { UserModule } from '../user/user.module';
//------------ Import controllers ------------//
import { AuthController } from './auth.controller';
//------------ Import services ------------//
import { AuthService } from './commands/auth.service';
//------------ Import strategies ------------//
import { LocalStrategy } from './strategy/local.strategy';
import { JwtAccessTokenStrategy } from './strategy/jwt-access-token.strategy';

const httpControllers = [AuthController];
const commandHandlers = [AuthService];
const strategy = [LocalStrategy, JwtAccessTokenStrategy];

@Module({
  imports: [
    PrismaModule,
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_ACCESS_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_ACCESS_EXPIRATION_TIME')}s`,
        },
      }),
    }),
  ],
  controllers: [...httpControllers],
  providers: [...commandHandlers, ...strategy],
  exports: [AuthService],
})
export class AuthModule {}
