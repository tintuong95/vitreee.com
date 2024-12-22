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
    async findAll(request) {
        try {
            return await this._accountProvider.findAllAsync(request);
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException(error.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        try {
            return await this._accountProvider.findOneAsync(id);
        }
        catch (error) {
            throw new common_1.HttpException(error.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createAsync(create) {
        try {
            return await this._accountProvider.addAsync(create);
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException(error.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateAsync(update, id) {
        try {
            return await this._accountProvider.updateAsync(id, update);
        }
        catch (error) {
            throw new common_1.HttpException(error.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async removeAsync(id) {
        try {
            return await this._accountProvider.removeAsync(id);
        }
        catch (error) {
            throw new common_1.HttpException(error.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async restoreAsync(id) {
        try {
            return await this._accountProvider.restoreAsync(id);
        }
        catch (error) {
            throw new common_1.HttpException(error.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.AccountController = AccountController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [account_dto_1.CreateAccountDTO]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "createAsync", null);
__decorate([
    (0, common_1.Post)(':id/update'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [account_dto_1.UpdateAccountDTO, String]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "updateAsync", null);
__decorate([
    (0, common_1.Delete)(':id/remove'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "removeAsync", null);
__decorate([
    (0, common_1.Delete)(':id/restore'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AccountController.prototype, "restoreAsync", null);
exports.AccountController = AccountController = __decorate([
    (0, common_1.Controller)('account'),
    __metadata("design:paramtypes", [account_provider_1.AccountProvider])
], AccountController);
//# sourceMappingURL=account.controller.js.map