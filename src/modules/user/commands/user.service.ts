import { Injectable, Logger } from '@nestjs/common';
import * as argon2 from 'argon2';

//------------ Import services ------------//
import { PrismaService } from '../../prisma';
//------------ Import exceptions ------------//
import { UserAlreadyExistsException } from '../exceptions/user.exception';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly prismaService: PrismaService) {}

  public async create({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    const user = await this.prismaService.users.findFirst({
      where: { email },
    });
    if (user) {
      throw new UserAlreadyExistsException();
    }
    const hashedPassword = await this.hashPassword(password);
    const newUser = await this.prismaService.users.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    });
    return newUser;
  }
  private async validatePassword(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return argon2.verify(hashedPassword, plainTextPassword);
  }
  private hashPassword(password: string): Promise<string> {
    return argon2.hash(password);
  }
}
