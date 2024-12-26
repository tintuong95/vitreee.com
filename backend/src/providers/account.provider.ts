import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/entities/account';
import { Repository } from 'typeorm';
import * as _ from 'lodash';
import { Request } from 'express';
import { CreateAccountDto, UpdateAccountDto } from 'src/dto/account.dto';
import { queryHandler } from 'src/helper/pagination';

@Injectable()
export class AccountProvider {
  /**
   *
   * @param accountRepository
   */
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  /**
   *
   * @returns
   */
  public async findAllAsync(request: Request): Promise<{
    count: number;
    list: Account[];
    currentPage: number;
    perPage: number;
  }> {
    const { skip, take, currentPage, perPage } = queryHandler(request.query);
    const result = this.accountRepository
      .createQueryBuilder('account')
      .where(`account.deletedAt IS NULL`)
      .orderBy('account.createdAt', 'DESC')
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
  public async findOneAsync(id: string): Promise<Account | null> {
    const find = await this.accountRepository
      .createQueryBuilder('account')
      .where(`account.deletedAt IS NULL`)
      .andWhere(`account.id = :id`, {
        id: `${id}`,
      })

      .getOne();
    if (!find) throw new NotFoundException('account Id ' + id + ' Not Found !');
    return find;
  }

  /**
   *
   * @param CreateAccountDto
   * @returns
   */
  public async addAsync(CreateAccountDto: CreateAccountDto): Promise<Account> {
    const create = this.accountRepository.create(CreateAccountDto);
    await this.accountRepository.save(create);
    return create;
  }

  /**
   *
   * @param id
   * @param update
   * @returns
   */
  public async updateAsync(
    id: string,
    update: UpdateAccountDto,
  ): Promise<Account> {
    const find = await this.accountRepository.findOneBy({ id });
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
  async removeAsync(id: string) {
    const find = await this.accountRepository.softDelete(id);
    return find;
  }

  /**
   *
   * @param id
   * @returns
   */
  async restoreAsync(id: string) {
    const find = await this.accountRepository.restore(id);
    return find;
  }

  async signInAsync(email: string, password: string) {
    const find = await this.accountRepository.findOneBy({ email });
    return find.isTruePassword(password) ? find : null;
  }
}
