import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

//------------ Import services ------------//
import { PrismaService } from '../../prisma';
import { UserService } from '../../user/commands/user.service';
//------------ Import DTOs ------------//
import { SignUpRequestDTO } from '../dtos/signup-request.dto';
import { LoginRequestDTO } from '../dtos/login-request.dto';
import { users } from '@prisma/client';
@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  public async signup({ email, password }: SignUpRequestDTO) {
    const hashedPassword = await this.hashPassword(password);
    const newUser = await this.userService.create({
      email: email,
      password: hashedPassword,
    });
    return newUser;
  }
  public async signToken(user: users) {
    return {
      access_token: this.generateAccessToken({ user_id: user.id.toString() }),
    };
  }
  public async verify({ email, password }: LoginRequestDTO) {
    const user = await this.userService.getByEmail(email);
    const isPasswordMatching = await this.validatePassword(
      password,
      user.password,
    );
    if (isPasswordMatching) {
      return user;
    }
    return null;
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
  private generateAccessToken(payload: { user_id: string }): string {
    const JWT_ACCESS_EXPIRATION_TIME = this.configService.get(
      'JWT_ACCESS_EXPIRATION_TIME',
    );
    const JWT_ACCESS_SECRET = this.configService.get('JWT_ACCESS_SECRET');
    return this.jwtService.sign(payload, {
      secret: JWT_ACCESS_SECRET,
      expiresIn: Number(JWT_ACCESS_EXPIRATION_TIME),
    });
  }
}
