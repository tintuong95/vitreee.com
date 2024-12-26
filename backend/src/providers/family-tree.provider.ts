import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateFamilyTreeDTO,
  UpdateFamilyTreeDTO,
} from 'src/dto/family-tree.dto';
import { FamilyTree } from 'src/entities/family-tree';
import { Repository } from 'typeorm';
import * as _ from 'lodash';
import { Request } from 'express';
import { queryHandler } from 'src/helper/pagination';

@Injectable()
export class FamilyTreeProvider {
  /**
   *
   * @param familyTreesRepository
   */
  constructor(
    @InjectRepository(FamilyTree)
    private familyTreesRepository: Repository<FamilyTree>,
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
    list: FamilyTree[];
    currentPage: number;
    perPage: number;
  }> {
    const { skip, take, currentPage, perPage } = queryHandler(request.query);
    const result = this.familyTreesRepository
      .createQueryBuilder('family_tree')
      .where(`family_tree.deletedAt IS NULL`)
      .andWhere(`family_tree.accountId = :accountId`, {
        accountId: `${accountId}`,
      })
      .orderBy('family_tree.createdAt', 'DESC')
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
  ): Promise<FamilyTree | null> {
    const find = await this.familyTreesRepository
      .createQueryBuilder('family_tree')
      .where(`family_tree.deletedAt IS NULL`)
      .andWhere(`family_tree.id = :id`, {
        id: `${id}`,
      })
      .andWhere(`family_tree.accountId = :accountId`, {
        accountId: `${accountId}`,
      })
      .getOne();
    if (!find)
      throw new NotFoundException('family_tree Id ' + id + ' Not Found !');
    return find;
  }

  /**
   *
   * @param createFamilyTreeDTO
   * @returns
   */
  public async addAsync(
    accountId: string,
    createFamilyTreeDTO: CreateFamilyTreeDTO,
  ): Promise<FamilyTree> {
    const create = this.familyTreesRepository.create({
      accountId,
      ...createFamilyTreeDTO,
    });
    await this.familyTreesRepository.save(create);
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
    update: UpdateFamilyTreeDTO,
  ): Promise<FamilyTree> {
    const find = await this.familyTreesRepository
      .createQueryBuilder('family_tree')
      .where(`family_tree.deletedAt IS NULL`)
      .andWhere(`family_tree.id = :id`, {
        id: `${id}`,
      })
      .andWhere(`family_tree.accountId = :accountId`, {
        accountId: `${accountId}`,
      })
      .getOne();
    if (!find)
      throw new NotFoundException('family_tree Id ' + id + ' Not Found !');
    else {
      {
        _(update).forEach((val, key) => {
          if (val) find[key] = val;
        });
        return await this.familyTreesRepository.save(find);
      }
    }
  }

  /**
   *
   * @param id
   * @returns
   */
  async removeAsync(accountId: string, id: string) {
    const find = await this.familyTreesRepository.softDelete({
      id,
      accountId,
    });
    if (find.affected > 0)
      return 'Deleted family tree Id ' + id + ' successfully !';
    throw new NotFoundException('family tree Id ' + id + ' Not Found !');
  }

  /**
   *
   * @param id
   * @returns
   */
  async restoreAsync(accountId: string, id: string) {
    const result = await this.familyTreesRepository.restore({
      id,
      accountId,
    });
    if (result.affected > 0)
      return 'Restore family tree Id ' + id + ' successfully !';
    throw new NotFoundException('family tree Id ' + id + ' Not Found !');
  }
}
