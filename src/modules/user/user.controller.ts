import { Body, Controller, Get, HttpStatus, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
//------------ Import services ------------//
import { UserService } from './commands/user.service';
//------------ Import DTOs ------------//
import { DeleteUserRequestDTO } from './dtos/del-user-request.dto';

@Controller({ path: 'api/user' })
@ApiTags('User')
@ApiTags('Authentication')
@ApiBearerAuth('Authorization')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
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
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async deleteUser(@Body() input: DeleteUserRequestDTO, @Req() req) {
    return this.userService.deleteById(req.user.id);
  }
}
