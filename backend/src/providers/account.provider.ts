import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/entities/account';
import { Repository } from 'typeorm';
import * as _ from 'lodash';
import { Request } from 'express';
import { CreateAccountDTO, UpdateAccountDTO } from 'src/dto/account.dto';

@Injectable()
export class AccountProvider {

  /**
   * 
   * @param accountRepository 
   */
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) { }


  /**
   * 
   * @returns 
   */
  public async findAllAsync(request: Request): Promise<{
    count: number,
    data: Account[]
  }> {
    const { currentPage = 1, pageSize = 100 } = request.query;
    const skip = (+currentPage - 1) * +pageSize;
    const result = this.accountRepository
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
  public async findOneAsync(id: string): Promise<Account | null> {
    return this.accountRepository.findOneBy({ id });
  }

  /**
   * 
   * @param createAccountDTO 
   * @returns 
   */
  public async addAsync(createAccountDTO: CreateAccountDTO): Promise<Account> {
    const create = this.accountRepository.create(createAccountDTO);
    await this.accountRepository.save(create);
    return create;
  }


  /**
   * 
   * @param id 
   * @param update 
   * @returns 
   */
  public async updateAsync(id: string, update: UpdateAccountDTO): Promise<Account> {
    const find = await this.accountRepository.findOneBy({ id })
    if (find) {
      _(update).forEach((val, key) => {
        if (val) find[key] = val;
      });
      return await this.accountRepository.save(find);
    }
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  async removeAsync(id: number) {
    const find = await this.accountRepository.softDelete(id);
    return find;
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  async restoreAsync(id: number) {
    const find = await this.accountRepository.restore(id);
    return find;
  }

  async signInAsync(
    email: string,
    password: string
  ) {
    const find = await this.accountRepository.findOneBy({ email })
    if (find) {
      if (find.isTruePassword(password)) {
        return find;
      }
      return null;
    }
    return null;
  }


}