import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Request} from 'express';
import * as _ from 'lodash';
import {
	CreateFamilyTreeDTO,
	UpdateFamilyTreeDTO,
} from 'src/dto/family-tree.dto';
import {FamilyTree} from 'src/entities/family-tree';
import {pagination, queryHandler} from 'src/helper/pagination';
import {Repository} from 'typeorm';

@Injectable()
export class FamilyTreeProvider {
	/**
	 *
	 * @param familyTreesRepository
	 */
	constructor(
		@InjectRepository(FamilyTree)
		private familyTreesRepository: Repository<FamilyTree>
	) {}

	/**
	 *
	 * @returns
	 */
	public async findAllAsync(accountId: number, request: Request): Promise<any> {
		const {skip, take, currentPage, perPage} = queryHandler(request.query);
		const {name = ''} = request.query;
		const result = this.familyTreesRepository
			.createQueryBuilder('family_tree')
			.where(`family_tree.deletedAt IS NULL`)
			.andWhere(`family_tree.accountId = :accountId`, {
				accountId: `${accountId}`,
			})

			.orderBy('family_tree.createdAt', 'DESC')
			.skip(+skip)
			.take(+take);
		name &&
			result.andWhere('family_tree.name LIKE :name', {
				name: `%${name}%`,
			});
		const count = await result.getCount();
		const list = await result.getMany();
		return pagination(request, [list, count], currentPage, perPage);
	}

	/**
	 *
	 * @param id
	 * @returns
	 */
	public async findOneAsync(
		accountId: number,
		id: number
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
		accountId: number,
		createFamilyTreeDTO: CreateFamilyTreeDTO
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
		accountId: number,
		id: number,
		update: UpdateFamilyTreeDTO
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
	async removeAsync(accountId: number, id: number) {
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
	async restoreAsync(accountId: number, id: number) {
		const result = await this.familyTreesRepository.restore({
			id,
			accountId,
		});
		if (result.affected > 0)
			return 'Restore family tree Id ' + id + ' successfully !';
		throw new NotFoundException('family tree Id ' + id + ' Not Found !');
	}
}
