import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../commands/auth.service';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(
  HeaderAPIKeyStrategy,
  'x-api-key',
) {
  constructor(private authService: AuthService) {
    super(
      {
        header: 'x-api-key',
        prefix: '',
      },
      true,
      async (apikey, done) => {
        const user = await authService.verifyByApiKey(apikey);
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      },
    );
  }
}
