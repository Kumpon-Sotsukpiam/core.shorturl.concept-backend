import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
//------------ Import services ------------//
import { AuthService } from './commands/auth.service';
//------------ Import guards ------------//
import { SignupAccessGuard } from './guards/canActivate/signupAccess.guard';
import { LocalGuard } from './guards/local.guard';
import { AccessTokenGuard } from './guards/jwt-access-token.guard';
//------------ Import DTOs ------------//
import { SignUpRequestDTO } from './dtos/signup-request.dto';
import { LoginRequestDTO } from './dtos/login-request.dto';
//------------ Import decorators ------------//
import { Public } from '../../common/decorators';

@Controller({ path: 'api/auth' })
@ApiTags('Authentication')
@ApiBearerAuth('Authorization')
@ApiSecurity('x-api-key')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/login')
  @UseGuards(LocalGuard)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async login(@Body() input: LoginRequestDTO, @Req() req) {
    return this.authService.signToken(req.user);
  }

  @Public()
  @Post('/signup')
  @UseGuards(SignupAccessGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
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
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
  })
  async apikey(@Req() req) {
    return this.authService.generateApiKey(req.user.id);
  }

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
