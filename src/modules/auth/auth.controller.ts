import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
//------------ Import services ------------//
import { AuthService } from './commands/auth.service';
//------------ Import guards ------------//
import { SignupAccessGuard } from './guards/signupAccess.guard';
//------------ Import guards ------------//
import { SignUpRequestDTO } from './dtos/signup-request.dto';

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
  @UseGuards(SignupAccessGuard)
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async signup(@Body() input: SignUpRequestDTO) {
    const user = await this.authService.signup(input);
    return null;
  }

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
