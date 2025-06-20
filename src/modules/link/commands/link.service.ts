import { Injectable, Logger } from '@nestjs/common';
import * as crypto from 'crypto';

//------------ Import services ------------//
import { PrismaService } from '../../prisma';
//------------ Import DTOs ------------//
import { CreateLinkRequestDTO } from '../dtos/create-link-request.dto';
import { UpdateLinkRequestDTO } from '../dtos/update-link-request.dto';
//------------ Import exceptions ------------//
import {
  LinkNotFoundException,
  LinkAlreadyExistsException,
} from '../exceptions/link.exception';

const tsquerySpecialChars = /[()|&:*!]/g;
const getQueryFromSearchPhrase = (searchPhrase: string) =>
  searchPhrase
    .replace(tsquerySpecialChars, ' ')
    .trim()
    .split(/\s+/)
    .join(' | ');

@Injectable()
export class LinkService {
  private readonly logger = new Logger(LinkService.name);

  constructor(private readonly prismaService: PrismaService) {}

  public async create(
    { target, address: custom_url, password, expire_in }: CreateLinkRequestDTO,
    { user_id }: { user_id: string },
  ) {
    const address = custom_url ? custom_url : crypto.randomUUID();
    // Check if custom link already exists
    if (custom_url) {
      const is_link_already = await this.prismaService.links.findFirst({
        where: {
          address: custom_url,
        },
      });
      if (is_link_already) {
        throw new LinkAlreadyExistsException();
      }
    }
    const link = await this.prismaService.links.create({
      data: {
        target,
        password,
        expire_in,
        address,
        user_id: user_id,
      },
    });
    return link;
  }
  public async update(id: number, { target }: UpdateLinkRequestDTO) {
    const link = await this.prismaService.links.findUnique({
      where: { id },
    });
    if (!link) {
      throw new LinkNotFoundException();
    }
    const newlink = await this.prismaService.links.update({
      where: {
        id,
      },
      data: {
        target,
      },
    });
    return newlink;
  }
  public async get({
    offset,
    limit,
    search,
    user_id,
  }: {
    offset: number;
    limit: number;
    search?: string;
    user_id: string;
  }) {
    const total = await this.prismaService.links.count({
      where: {
        user_id,
        target: {
          contains: getQueryFromSearchPhrase(search || ''),
        },
      },
    });
    const links = await this.prismaService.links.findMany({
      select: {
        id: true,
        address: true,
        description: true,
        expire_in: true,
        target: true,
        visit_count: true,
        created_at: true,
        updated_at: true,
      },
      where: {
        user_id,
        target: {
          contains: getQueryFromSearchPhrase(search || ''),
        },
      },
      skip: offset,
      take: limit,
      orderBy: {
        id: 'desc',
      },
    });
    return { data: links, total, limit, offset };
  }
  public async getByAddress(address: string) {
    return this.prismaService.links.findFirst({
      where: {
        address,
      },
    });
  }
  public async deleteById(id: number) {
    const link = await this.prismaService.links.findUnique({
      where: { id },
    });
    if (!link) {
      throw new LinkNotFoundException();
    }
    return this.prismaService.links.delete({
      select: {
        id: true,
      },
      where: { id },
    });
  }
}
