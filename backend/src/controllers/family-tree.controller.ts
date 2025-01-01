import {
	Body,
	Controller,
	Delete,
	Get,
	HttpStatus,
	Param,
	Post,
	Put,
	Req,
	Res,
	UseGuards,
} from '@nestjs/common';
import {Request, Response} from 'express';
import {AccountDetail, AccountDetailDTO} from 'src/auth/account.decorator';
import {JwtAuthGuard} from 'src/auth/jwt-guard.provider';
import {
	CreateFamilyTreeDTO,
	UpdateFamilyTreeDTO,
} from 'src/dto/family-tree.dto';
import {FamilyTreeProvider} from 'src/providers/family-tree.provider';

@Controller('familyTree')
@UseGuards(JwtAuthGuard)
export class FamilyTreeController {
	/**
	 *
	 * @param _familyTreeProvider
	 */
	constructor(private _familyTreeProvider: FamilyTreeProvider) {}

	/**
	 *
	 * @param request
	 * @returns
	 */
	@Get('list')
	async findAll(
		@Req() request: Request,
		@Res() response: Response,
		@AccountDetail() _account: AccountDetailDTO
	): Promise<any> {
		try {
			const find = await this._familyTreeProvider.findAllAsync(
				_account.id,
				request
			);
			if (find.count == 0) {
				return response.status(HttpStatus.NOT_FOUND).json({
					message: 'Data not found!',
				});
			} else {
				return response.status(HttpStatus.OK).json({
					message: 'Find data successfully!',
					data: find,
				});
			}
		} catch (error) {
			console.log(error);
			return response.status(HttpStatus.BAD_REQUEST).json({
				message: 'Find data failture!',
			});
		}
	}

	/**
	 *
	 * @param id
	 * @returns
	 */
	@Get(':id/details')
	async findOne(
		@Param('id') id: number,
		@Res() response: Response,
		@AccountDetail() _account: AccountDetailDTO
	): Promise<any> {
		try {
			const find = await this._familyTreeProvider.findOneAsync(_account.id, id);
			return response.status(HttpStatus.OK).json({
				message: 'Find data successfully!',
				data: find,
			});
		} catch (error) {
			console.log(error);
			return response.status(HttpStatus.BAD_REQUEST).json({
				message: 'Find data failture!',
			});
		}
	}

	/**
	 *
	 * @param create
	 * @returns
	 */
	@Post('create')
	async createAsync(
		@Body() create: CreateFamilyTreeDTO,
		@Res() response: Response,
		@AccountDetail() _account: AccountDetailDTO
	): Promise<any> {
		try {
			const find = await this._familyTreeProvider.addAsync(_account.id, create);
			return response.status(HttpStatus.OK).json({
				message: 'Create successfully!',
				data: find,
			});
		} catch (error) {
			console.log(error);
			return response.status(HttpStatus.BAD_REQUEST).json({
				message: 'Create failture!',
			});
		}
	}

	/**
	 *
	 * @param update
	 * @param id
	 * @returns
	 */
	@Put(':id/update')
	async updateAsync(
		@Body() update: UpdateFamilyTreeDTO,
		@Param('id') id: number,
		@Res() response: Response,
		@AccountDetail() _account: AccountDetailDTO
	): Promise<any> {
		try {
			const find = await this._familyTreeProvider.updateAsync(
				_account.id,
				id,
				update
			);
			return response.status(HttpStatus.OK).json({
				message: 'Update successfully!',
				data: find,
			});
		} catch (error) {
			console.log(error);
			return response.status(HttpStatus.BAD_REQUEST).json({
				message: 'Update failture!',
			});
		}
	}

	/**
	 *
	 * @param id
	 * @returns
	 */
	@Delete(':id/remove')
	async removeAsync(
		@Param('id') id: number,
		@Res() response: Response,
		@AccountDetail() _account: AccountDetailDTO
	): Promise<any> {
		try {
			const find = await this._familyTreeProvider.removeAsync(_account.id, id);
			return response.status(HttpStatus.OK).json({
				message: 'Remove successfully!',
				data: find,
			});
		} catch (error) {
			console.log(error);
			return response.status(HttpStatus.BAD_REQUEST).json({
				message: 'Remove failture!',
			});
		}
	}

	/**
	 *
	 * @param id
	 * @returns
	 */
	@Delete(':id/restore')
	async restoreAsync(
		@Param('id') id: number,
		@Res() response: Response,
		@AccountDetail() _account: AccountDetailDTO
	): Promise<any> {
		try {
			const result = await this._familyTreeProvider.restoreAsync(
				_account.id,
				id
			);
			return response.status(HttpStatus.OK).json({
				message: 'Restore successfully!',
				data: result,
			});
		} catch (error) {
			console.log(error);
			return response.status(HttpStatus.BAD_REQUEST).json({
				message: 'Restore failture!',
			});
		}
	}
}
