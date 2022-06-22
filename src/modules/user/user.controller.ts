import { Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
//------------ Import services ------------//
import { UserService } from './commands/user.service';
//------------ Import DTOs ------------//

@Controller({ path: 'user' })
@ApiTags('User')
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
  async deleteUser() {}
}
