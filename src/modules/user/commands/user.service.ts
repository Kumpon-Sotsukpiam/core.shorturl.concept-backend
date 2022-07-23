import { Injectable, Logger } from '@nestjs/common';

//------------ Import services ------------//
import { PrismaService } from '../../prisma';
//------------ Import exceptions ------------//
import { UserAlreadyExistsException } from '../exceptions/user.exception';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly prismaService: PrismaService) {}

  public async create(data: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
  }) {
    const user = await this.prismaService.users.findFirst({
      where: { email: data.email },
    });
    if (user) {
      throw new UserAlreadyExistsException();
    }
    const newUser = await this.prismaService.users.create({
      data,
    });
    return newUser;
  }
  public async updateApikey(apikey: string, user_id: string) {
    return this.prismaService.users.update({
      where: {
        id: user_id,
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
  public async getById(id: string) {
    return this.prismaService.users.findUnique({
      where: { id },
    });
  }
  public async getByApiKey(apikey: string) {
    return this.prismaService.users.findFirst({
      where: { apikey },
    });
  }
  public async deleteById(id: string) {
    return this.prismaService.users.delete({
      select: {
        id: true,
        email: true,
      },
      where: {
        id,
      },
    });
  }
}
