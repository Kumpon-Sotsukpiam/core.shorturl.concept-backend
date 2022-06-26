import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
//------------ Import services ------------//
import { AuthService } from './commands/auth.service';
//------------ Import guards ------------//
import { SignupAccessGuard } from './guards/signupAccess.guard';
import { LocalGuard } from './guards/local.guard';
import { AccessTokenGuard } from './guards/jwt-access-token.guard';
//------------ Import DTOs ------------//
import { SignUpRequestDTO } from './dtos/signup-request.dto';
import { LoginRequestDTO } from './dtos/login-request.dto';

@Controller({ path: 'auth' })
@ApiTags('Authentication')
@ApiBearerAuth('Authorization')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @UseGuards(LocalGuard)
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async login(@Body() input: LoginRequestDTO, @Req() req) {
    return this.authService.signToken(req.user);
  }

  @Post('/signup')
  @UseGuards(SignupAccessGuard)
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async signup(@Body() input: SignUpRequestDTO) {
    const user = await this.authService.signup(input);
    return null;
  }

  // @Post('/renew')
  // @ApiResponse({
  //   status: HttpStatus.OK,
  // })
  // async renew() { }

  // @Post('/change-password')
  // @ApiResponse({
  //   status: HttpStatus.OK,
  // })
  // async changePassword() { }

  // @Post('/change-email')
  // @ApiResponse({
  //   status: HttpStatus.OK,
  // })
  // async changeEmail() { }

  @Post('/apikey')
  @UseGuards(AccessTokenGuard)
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async apikey() {}

  // @Post('/reset-password/:resetPasswordToken')
  // @ApiResponse({
  //   status: HttpStatus.OK,
  // })
  // async resetPassword() { }

  // @Post('/verify-email/:changeEmailToken')
  // @ApiResponse({
  //   status: HttpStatus.OK,
  // })
  // async verifyEmail() { }

  // @Post('/verify/:verificationToken')
  // @ApiResponse({
  //   status: HttpStatus.OK,
  // })
  // async verify() { }
}
