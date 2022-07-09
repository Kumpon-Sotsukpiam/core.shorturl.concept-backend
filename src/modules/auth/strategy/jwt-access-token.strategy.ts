import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

//------------ Import services ------------//
import { UserService } from '../../user/commands/user.service';
//------------ Import interfaces ------------//
import { TokenPayload } from '../interfaces/tokenPayload.interface';
//------------ Import exceptions ------------//
import { UnauthorizedException } from '../exceptions/auth.exceptions';

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  private readonly logger = new Logger(JwtAccessTokenStrategy.name);
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_ACCESS_SECRET'),
    });
  }
  async validate(payload: TokenPayload) {
    const user = await this.userService.getById(payload.user_id);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
