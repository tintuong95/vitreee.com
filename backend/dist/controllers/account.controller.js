"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountController = void 0;
const common_1 = require("@nestjs/common");
const account_dto_1 = require("../dto/account.dto");
const account_provider_1 = require("../providers/account.provider");
let AccountController = class AccountController {
    constructor(_accountProvider) {
        this._accountProvider = _accountProvider;
    }
    async findAll(request, response) {
        try {
            const find = await this._accountProvider.findAllAsync(request);
            return response.status(common_1.HttpStatus.OK).json({
                message: 'Find data successfully!',
                data: find,
            });
        }
        catch (error) {
            console.log(error);
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({
                message: 'Find data failture!',
            });
        }
    }
    async findOne(id, response) {
        try {
            const find = await this._accountProvider.findOneAsync(id);
            return response.status(common_1.HttpStatus.OK).json({
                message: 'Find data successfully!',
                data: find,
            });
        }
        catch (error) {
            console.log(error);
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({
                message: 'Find data failture!',
            });
        }
    }
    async createAsync(create, response) {
        try {
            const find = await this._accountProvider.addAsync(create);
            return response.status(common_1.HttpStatus.OK).json({
                message: 'Create successfully!',
                data: find,
            });
        }
        catch (error) {
            console.log(error);
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({
                message: 'Create failture!',
            });
        }
    }
    async updateAsync(update, id, response) {
        try {
            const find = await this._accountProvider.updateAsync(id, update);
            return response.status(common_1.HttpStatus.OK).json({
                message: 'Update successfully!',
                data: find,
            });
        }
        catch (error) {
            console.log(error);
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({
                message: 'Update failture!',
            });
        }
    }
    async removeAsync(id, response) {
        try {
            const find = await this._accountProvider.removeAsync(id);
            return response.status(common_1.HttpStatus.OK).json({
                message: 'Remove successfully!',
                data: find,
            });
        }
        catch (error) {
            console.log(error);
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({
                message: 'Remove failture!',
            });
        }
    }
    async restoreAsync(id, response) {
        try {
            const result = await this._accountProvider.restoreAsync(id);
            return response.status(common_1.HttpStatus.OK).json({
                message: 'Restore successfully!',
                data: result,
            });
        }
        catch (error) {
            console.log(error);
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({
                message: 'Restore failture!',
            });
        }
    }
};
exports.AccountController = AccountController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [account_dto_1.CreateAccountDto, Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "createAsync", null);
__decorate([
    (0, common_1.Post)(':id/update'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [account_dto_1.UpdateAccountDto, String, Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "updateAsync", null);
__decorate([
    (0, common_1.Delete)(':id/remove'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "removeAsync", null);
__decorate([
    (0, common_1.Delete)(':id/restore'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "restoreAsync", null);
exports.AccountController = AccountController = __decorate([
    (0, common_1.Controller)('account'),
    __metadata("design:paramtypes", [account_provider_1.AccountProvider])
], AccountController);
//# sourceMappingURL=account.controller.js.map