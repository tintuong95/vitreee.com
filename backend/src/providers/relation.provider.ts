import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Relation } from 'src/entities/relation';
import { Repository } from 'typeorm';
import * as _ from 'lodash';
import { Request } from 'express';
import { CreateRelationDTO, UpdateRelationDTO } from 'src/dto/relation.dto';

@Injectable()
export class RelationProvider {

  /**
   * 
   * @param relationRepository 
   */
  constructor(
    @InjectRepository(Relation)
    private relationRepository: Repository<Relation>,
  ) { }


  /**
   * 
   * @returns 
   */
  public async findAllAsync(request: Request): Promise<{
    count: number,
    data: Relation[]
  }> {
    const { currentPage = 1, pageSize = 100 } = request.query;
    const skip = (+currentPage - 1) * +pageSize;
    const result = this.relationRepository
      .createQueryBuilder('family_tree')
      .where(`family_tree.deletedAt IS NULL`)
      .orderBy('family_tree.createdAt', 'DESC')
      .skip(+skip)
      .take(+pageSize);

    const count = await result.getCount();
    const data = await result.getMany();
    return {
      count,
      data,
    };
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  public async findOneAsync(id: string): Promise<Relation | null> {
    return this.relationRepository.findOneBy({ id });
  }

  /**
   * 
   * @param createRelationDTO 
   * @returns 
   */
  public async addAsync(createRelationDTO: CreateRelationDTO): Promise<Relation> {
    const create = this.relationRepository.create(createRelationDTO);
    await this.relationRepository.save(create);
    return create;
  }


  /**
   * 
   * @param id 
   * @param update 
   * @returns 
   */
  public async updateAsync(id: string, update: UpdateRelationDTO): Promise<Relation> {
    const find = await this.relationRepository.findOneBy({ id })
    if (find) {
      _(update).forEach((val, key) => {
        if (val) find[key] = val;
      });
      return await this.relationRepository.save(find);
    }
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  async removeAsync(id: number) {
    const find = await this.relationRepository.softDelete(id);
    return find;
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  async restoreAsync(id: number) {
    const find = await this.relationRepository.restore(id);
    return find;
  }
}