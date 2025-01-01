import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Request} from 'express';
import * as _ from 'lodash';
import {CreateRelationDTO, UpdateRelationDTO} from 'src/dto/relation.dto';
import {Relation} from 'src/entities/relation';
import {queryHandler} from 'src/helper/pagination';
import {Repository} from 'typeorm';

@Injectable()
export class RelationProvider {
	/**
	 *
	 * @param relationRepository
	 */
	constructor(
		@InjectRepository(Relation)
		private relationRepository: Repository<Relation>
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
		list: Relation[];
		currentPage: number;
		perPage: number;
	}> {
		const {skip, take, currentPage, perPage} = queryHandler(request.query);
		const {familyTreeId = ''} = request.query;

		const result = this.relationRepository
			.createQueryBuilder('relation')
			.where(`relation.deletedAt IS NULL`)
			// .leftJoinAndSelect(
			// 	'relation.roomOrder',
			// 	'roomOrders',
			// 	'orders.id=roomOrders.orderId'
			// )
			.andWhere(`relation.accountId = :accountId`, {
				accountId: `${accountId}`,
			})
			.andWhere(`relation.familyTreeId = :familyTreeId`, {
				familyTreeId: `${familyTreeId}`,
			})
			.orderBy('relation.createdAt', 'DESC')
			.skip(+skip)
			.take(+take);

		const count = await result.getCount();
		const list = await result.getMany();

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
		accountId: number,
		createRelationDTO: CreateRelationDTO
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
		accountId: number,
		id: number,
		update: UpdateRelationDTO
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
	async removeAsync(accountId: number, id: number) {
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
	async restoreAsync(accountId: number, id: number) {
		const result = await this.relationRepository.restore({
			id,
			accountId,
		});
		if (result.affected > 0)
			return 'Restore relation Id ' + id + ' successfully !';
		throw new NotFoundException('relation Id ' + id + ' Not Found !');
	}
}
