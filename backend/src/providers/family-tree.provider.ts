import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFamilyTreeDTO, UpdateFamilyTreeDTO } from 'src/dto/family-tree.dto';
import { FamilyTree } from 'src/entities/family-tree';
import { Repository } from 'typeorm';
import * as _ from 'lodash';
import { Request } from 'express';

@Injectable()
export class FamilyTreeProvider {

  /**
   * 
   * @param familyTreesRepository 
   */
  constructor(
    @InjectRepository(FamilyTree)
    private familyTreesRepository: Repository<FamilyTree>,
  ) { }


  /**
   * 
   * @returns 
   */
  public async findAllAsync(request: Request): Promise<{
    count: number,
    list: FamilyTree[]
  }> {
    const { currentPage = 1, pageSize = 100 } = request.query;
    const skip = (+currentPage - 1) * +pageSize;
    const result = this.familyTreesRepository
      .createQueryBuilder('family_tree')
      .where(`family_tree.deletedAt IS NULL`)
      .orderBy('family_tree.createdAt', 'DESC')
      .skip(+skip)
      .take(+pageSize);

    const count = await result.getCount();
    const list = await result.getMany();
    return {
      count,
      list,
    };
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  public async findOneAsync(id: string): Promise<FamilyTree | null> {
    return this.familyTreesRepository.findOneBy({ id });
  }

  /**
   * 
   * @param createFamilyTreeDTO 
   * @returns 
   */
  public async addAsync(accountId: string, createFamilyTreeDTO: CreateFamilyTreeDTO): Promise<FamilyTree> {
    const create = this.familyTreesRepository.create({
      accountId,
      ...createFamilyTreeDTO
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
  public async updateAsync(id: string, update: UpdateFamilyTreeDTO): Promise<FamilyTree> {
    const find = await this.familyTreesRepository.findOneBy({ id })
    if (find) {
      _(update).forEach((val, key) => {
        if (val) find[key] = val;
      });
      return await this.familyTreesRepository.save(find);
    }
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  async removeAsync(id: number) {
    const find = await this.familyTreesRepository.softDelete(id);
    return find;
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  async restoreAsync(id: number) {
    const find = await this.familyTreesRepository.restore(id);
    return find;
  }
}