import { Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
//------------ Import services ------------//
import { AuthService } from './commands/auth.service';
//------------ Import DTOs ------------//

@Controller({ path: 'auth' })
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async login() {}

  @Post('/signup')
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async signup() {}

  @Post('/renew')
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async renew() {}

  @Post('/change-password')
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async changePassword() {}

  @Post('/change-email')
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async changeEmail() {}

  @Post('/apikey')
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async apikey() {}

  @Post('/reset-password/:resetPasswordToken')
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async resetPassword() {}

  @Post('/verify-email/:changeEmailToken')
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async verifyEmail() {}

  @Post('/verify/:verificationToken')
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async verify() {}
}
