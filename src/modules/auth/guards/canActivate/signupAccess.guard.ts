import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';

//------------ Import exceptions ------------//
import { RegitrationNotAllowedException } from '../../exceptions/auth.exceptions';

@Injectable()
export class SignupAccessGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}
  canActivate(): boolean | Promise<boolean> | Observable<boolean> {
    const DISALLOW_REGISTRATION = this.configService.get(
      'DISALLOW_REGISTRATION',
    );
    if (!DISALLOW_REGISTRATION) throw new RegitrationNotAllowedException();
    return true;
  }
}
