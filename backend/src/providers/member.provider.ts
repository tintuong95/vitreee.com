import {
	HttpException,
	HttpStatus,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Member} from 'src/entities/member';
import {Repository} from 'typeorm';
import * as _ from 'lodash';
import {Request} from 'express';
import {CreateMemberDTO, UpdateMemberDTO} from 'src/dto/member.dto';
import {queryHandler} from 'src/helper/pagination';

@Injectable()
export class MemberProvider {
	/**
	 *
	 * @param memberRepository
	 */
	constructor(
		@InjectRepository(Member)
		private memberRepository: Repository<Member>
	) {}

	/**
	 *
	 * @returns
	 */
	public async findAllAsync(
		accountId: number,
		request: Request
	): Promise<{
		count: number;
		list: Member[];
		currentPage: number;
		perPage: number;
	}> {
		const {skip, take, currentPage, perPage} = queryHandler(request.query);
		const {familyTreeId = ''} = request.query;
		const result = this.memberRepository
			.createQueryBuilder('member')
			.where(`member.deletedAt IS NULL`)
			.andWhere(`member.accountId = :accountId`, {
				accountId: `${accountId}`,
			})
			.andWhere(`member.familyTreeId = :familyTreeId`, {
				familyTreeId: `${familyTreeId}`,
			})
			.orderBy('member.createdAt', 'DESC')
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
		accountId: number,
		id: number
	): Promise<Member | null> {
		const find = await this.memberRepository
			.createQueryBuilder('member')
			.where(`member.deletedAt IS NULL`)
			.andWhere(`member.id = :id`, {
				id: `${id}`,
			})
			.andWhere(`member.accountId = :accountId`, {
				accountId: `${accountId}`,
			})
			.getOne();
		if (!find) throw new NotFoundException('member Id ' + id + ' Not Found !');
		return find;
	}

	/**
	 *
	 * @param createMemberDTO
	 * @returns
	 */
	public async addAsync(
		accountId: number,
		createMemberDTO: CreateMemberDTO
	): Promise<Member> {
		const create = this.memberRepository.create({
			accountId,
			...createMemberDTO,
		});
		await this.memberRepository.save(create);
		return create;
	}

	/**
	 *
	 * @param id
	 * @param update
	 * @returns
	 */
	public async updateAsync(
		accountId: number,
		id: number,
		update: UpdateMemberDTO
	): Promise<Member> {
		const find = await this.memberRepository
			.createQueryBuilder('member')
			.where(`member.deletedAt IS NULL`)
			.andWhere(`member.id = :id`, {
				id: `${id}`,
			})
			.andWhere(`member.accountId = :accountId`, {
				accountId: `${accountId}`,
			})
			.getOne();
		if (!find) throw new NotFoundException('member Id ' + id + ' Not Found !');
		else {
			{
				_(update).forEach((val, key) => {
					if (val) find[key] = val;
				});
				return await this.memberRepository.save(find);
			}
		}
	}

	/**
	 *
	 * @param id
	 * @returns
	 */
	async removeAsync(accountId: number, id: number) {
		const find = await this.memberRepository.softDelete({
			id,
			accountId,
		});
		if (find.affected > 0) return 'Deleted member Id ' + id + ' successfully !';
		throw new NotFoundException('member Id ' + id + ' Not Found !');
	}

	/**
	 *
	 * @param id
	 * @returns
	 */
	async restoreAsync(accountId: number, id: number) {
		const result = await this.memberRepository.restore({
			id,
			accountId,
		});
		if (result.affected > 0)
			return 'Restore member Id ' + id + ' successfully !';
		throw new NotFoundException('member Id ' + id + ' Not Found !');
	}
}
