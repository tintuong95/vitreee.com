import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from 'src/entities/member';
import { Repository } from 'typeorm';
import * as _ from 'lodash';
import { Request } from 'express';
import { CreateMemberDTO, UpdateMemberDTO } from 'src/dto/member.dto';

@Injectable()
export class MemberProvider {

  /**
   * 
   * @param memberRepository 
   */
  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
  ) { }


  /**
   * 
   * @returns 
   */
  public async findAllAsync(request: Request): Promise<{
    count: number,
    data: Member[]
  }> {
    const { currentPage = 1, pageSize = 100 } = request.query;
    const skip = (+currentPage - 1) * +pageSize;
    const result = this.memberRepository
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
  public async findOneAsync(id: string): Promise<Member | null> {
    return this.memberRepository.findOneBy({ id });
  }

  /**
   * 
   * @param createMemberDTO 
   * @returns 
   */
  public async addAsync(createMemberDTO: CreateMemberDTO): Promise<Member> {
    const create = this.memberRepository.create(createMemberDTO);
    await this.memberRepository.save(create);
    return create;
  }


  /**
   * 
   * @param id 
   * @param update 
   * @returns 
   */
  public async updateAsync(id: string, update: UpdateMemberDTO): Promise<Member> {
    const find = await this.memberRepository.findOneBy({ id })
    if (find) {
      _(update).forEach((val, key) => {
        if (val) find[key] = val;
      });
      return await this.memberRepository.save(find);
    }
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  async removeAsync(id: number) {
    const find = await this.memberRepository.softDelete(id);
    return find;
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  async restoreAsync(id: number) {
    const find = await this.memberRepository.restore(id);
    return find;
  }
}