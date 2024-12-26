import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Relation } from 'src/entities/relation';
import { Repository } from 'typeorm';
import * as _ from 'lodash';
import { Request } from 'express';
import { CreateRelationDTO, UpdateRelationDTO } from 'src/dto/relation.dto';
import { queryHandler } from 'src/helper/pagination';

@Injectable()
export class RelationProvider {
  /**
   *
   * @param relationRepository
   */
  constructor(
    @InjectRepository(Relation)
    private relationRepository: Repository<Relation>,
  ) {}

  /**
   *
   * @returns
   */
  public async findAllAsync(
    accountId: string,
    request: Request,
  ): Promise<{
    count: number;
    list: Relation[];
    currentPage: number;
    perPage: number;
  }> {
    const { skip, take, currentPage, perPage } = queryHandler(request.query);
    const result = this.relationRepository
      .createQueryBuilder('relation')
      .where(`relation.deletedAt IS NULL`)
      .andWhere(`relation.accountId = :accountId`, {
        accountId: `${accountId}`,
      })
      .orderBy('relation.createdAt', 'DESC')
      .skip(+skip)
      .take(+take);

    const count = await result.getCount();
    const list = await result.getMany();
    if (count == 0) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

    return {
      count,
      list,
      currentPage,
      perPage,
    };
  }

  /**
   *
   * @param id
   * @returns
   */
  public async findOneAsync(
    accountId: string,
    id: string,
  ): Promise<Relation | null> {
    const find = await this.relationRepository
      .createQueryBuilder('relation')
      .where(`relation.deletedAt IS NULL`)
      .andWhere(`relation.id = :id`, {
        id: `${id}`,
      })
      .andWhere(`relation.accountId = :accountId`, {
        accountId: `${accountId}`,
      })
      .getOne();
    if (!find)
      throw new NotFoundException('relation Id ' + id + ' Not Found !');
    return find;
  }

  /**
   *
   * @param createRelationDTO
   * @returns
   */
  public async addAsync(
    accountId: string,
    createRelationDTO: CreateRelationDTO,
  ): Promise<Relation> {
    const create = this.relationRepository.create({
      accountId,
      ...createRelationDTO,
    });
    await this.relationRepository.save(create);
    return create;
  }

  /**
   *
   * @param id
   * @param update
   * @returns
   */
  public async updateAsync(
    accountId: string,
    id: string,
    update: UpdateRelationDTO,
  ): Promise<Relation> {
    const find = await this.relationRepository
      .createQueryBuilder('relation')
      .where(`relation.deletedAt IS NULL`)
      .andWhere(`relation.id = :id`, {
        id: `${id}`,
      })
      .andWhere(`relation.accountId = :accountId`, {
        accountId: `${accountId}`,
      })
      .getOne();
    if (!find)
      throw new NotFoundException('relation Id ' + id + ' Not Found !');
    else {
      {
        _(update).forEach((val, key) => {
          if (val) find[key] = val;
        });
        return await this.relationRepository.save(find);
      }
    }
  }

  /**
   *
   * @param id
   * @returns
   */
  async removeAsync(accountId: string, id: string) {
    const find = await this.relationRepository.softDelete({
      id,
      accountId,
    });
    if (find.affected > 0)
      return 'Deleted relation Id ' + id + ' successfully !';
    throw new NotFoundException('relation Id ' + id + ' Not Found !');
  }

  /**
   *
   * @param id
   * @returns
   */
  async restoreAsync(accountId: string, id: string) {
    const result = await this.relationRepository.restore({
      id,
      accountId,
    });
    if (result.affected > 0)
      return 'Restore relation Id ' + id + ' successfully !';
    throw new NotFoundException('relation Id ' + id + ' Not Found !');
  }
}
