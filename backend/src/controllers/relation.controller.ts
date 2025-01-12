import {
	Body,
	Controller,
	Delete,
	Get,
	HttpStatus,
	Param,
	Post,
	Req,
	Res,
	UseGuards,
} from '@nestjs/common';
import {Request, Response} from 'express';
import {AccountDetail, AccountDetailDTO} from 'src/auth/account.decorator';
import {JwtAuthGuard} from 'src/auth/jwt-guard.provider';
import {CreateRelationDTO, UpdateRelationDTO} from 'src/dto/relation.dto';
import {RelationProvider} from 'src/providers/relation.provider';

@Controller('relation')
@UseGuards(JwtAuthGuard)
export class RelationController {
	/**
	 *
	 * @param _relationProvider
	 */
	constructor(private _relationProvider: RelationProvider) {}

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
			const find = await this._relationProvider.findAllAsync(
				_account.id,
				request
			);
			if (find.count == 0) {
				return response.status(HttpStatus.OK).json({
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
			const find = await this._relationProvider.findOneAsync(_account.id, id);
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
		@Body() create: CreateRelationDTO,
		@Res() response: Response,
		@AccountDetail() _account: AccountDetailDTO
	): Promise<any> {
		try {
			const find = await this._relationProvider.addAsync(_account.id, create);
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
	@Post(':id/update')
	async updateAsync(
		@Body() update: UpdateRelationDTO,
		@Param('id') id: number,
		@Res() response: Response,
		@AccountDetail() _account: AccountDetailDTO
	): Promise<any> {
		try {
			const find = await this._relationProvider.updateAsync(
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
			const find = await this._relationProvider.removeAsync(_account.id, id);
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
			const result = await this._relationProvider.restoreAsync(_account.id, id);
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
