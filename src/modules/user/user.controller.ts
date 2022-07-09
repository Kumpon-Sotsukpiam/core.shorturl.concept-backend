import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

//------------ Import services ------------//
import { UserService } from './commands/user.service';
import { AuthService } from '../auth/commands/auth.service';
//------------ Import DTOs ------------//
import { DeleteUserRequestDTO } from './dtos/del-user-request.dto';
//------------ Import decorators ------------//
import { GetCurrentUser } from '../../common/decorators/get-current-user.decorator';
//------------ Import exceptions ------------//
import { UserPasswordConfirmNotValid } from './exceptions/user.exception';

@Controller({ path: 'api/user' })
@ApiTags('User')
@ApiTags('Authentication')
@ApiBearerAuth('Authorization')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async getUser(@Req() req) {
    const user = await this.userService.getById(req.user.id);
    return {
      apikey: user.apikey,
      email: user.email,
    };
  }

  @Post('/delete')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async deleteUser(
    @Body() input: DeleteUserRequestDTO,
    @GetCurrentUser() user,
  ) {
    const verify_user = await this.authService.verify({
      email: user.email,
      password: input.password,
    });
    if (!verify_user) {
      throw new UserPasswordConfirmNotValid();
    }
    return this.userService.deleteById(user.id);
  }
}
