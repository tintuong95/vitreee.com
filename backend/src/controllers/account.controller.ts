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
} from '@nestjs/common';
import {Request, Response} from 'express';
import {CreateAccountDto, UpdateAccountDto} from 'src/dto/account.dto';
import {AccountProvider} from 'src/providers/account.provider';

@Controller('account')
export class AccountController {
	/**
	 *
	 * @param _accountProvider
	 */
	constructor(private _accountProvider: AccountProvider) {}

	/**
	 *
	 * @param request
	 * @returns
	 */
	@Get('list')
	async findAll(
		@Req() request: Request,
		@Res() response: Response
	): Promise<any> {
		try {
			const find = await this._accountProvider.findAllAsync(request);
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
		@Res() response: Response
	): Promise<any> {
		try {
			const find = await this._accountProvider.findOneAsync(id);
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
		@Body() create: CreateAccountDto,
		@Res() response: Response
	): Promise<any> {
		try {
			const find = await this._accountProvider.addAsync(create);
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
		@Body() update: UpdateAccountDto,
		@Param('id') id: number,
		@Res() response: Response
	): Promise<any> {
		try {
			const find = await this._accountProvider.updateAsync(id, update);
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
		@Res() response: Response
	): Promise<any> {
		try {
			const find = await this._accountProvider.removeAsync(id);
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
		@Res() response: Response
	): Promise<any> {
		try {
			const result = await this._accountProvider.restoreAsync(id);
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
