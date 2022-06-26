import { Injectable, Logger } from '@nestjs/common';

//------------ Import services ------------//
import { PrismaService } from '../../prisma';
import { UserService } from '../../user/commands/user.service';
//------------ Import DTOs ------------//
import { SignUpRequestDTO } from '../dtos/signup-request.dto';
@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
  ) {}

  public async signup({ email, password }: SignUpRequestDTO) {
    const newUser = await this.userService.create({ email, password });
    return newUser;
  }
}
