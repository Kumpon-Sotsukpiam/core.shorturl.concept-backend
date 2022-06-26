import { Injectable, Logger } from '@nestjs/common';
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
    const newUser = await this.prismaService.users.create({
      data: {
        email: email,
        password: password,
      },
    });
    return newUser;
  }
  public async updateApikey(apikey: string, user_id: string) {
    return this.prismaService.users.update({
      where: {
        id: Number(user_id),
      },
      data: {
        apikey,
      },
    });
  }
  public async getByEmail(email: string) {
    return this.prismaService.users.findUnique({
      where: { email },
    });
  }
  public async getById(id: number) {
    return this.prismaService.users.findUnique({
      where: { id },
    });
  }
  public async getByApiKey(apikey: string) {
    return this.prismaService.users.findFirst({
      where: { apikey },
    });
  }
  public async deleteById(id: number) {
    return this.prismaService.users.delete({
      where: { id },
    });
  }
}
