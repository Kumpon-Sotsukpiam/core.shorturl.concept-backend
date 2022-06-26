import {
  Body,
  Controller,
  Get,
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
import { UserService } from './commands/user.service';
//------------ Import DTOs ------------//
import { DeleteUserRequestDTO } from './dtos/del-user-request.dto';

@Controller({ path: 'user' })
@ApiTags('User')
@ApiTags('Authentication')
@ApiBearerAuth('Authorization')
@ApiSecurity('x-api-key')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async getUser() {}

  @Post('/delete')
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async deleteUser(@Body() input: DeleteUserRequestDTO, @Req() req) {
    // return this.userService.deleteById(req.user.id)
  }
}
