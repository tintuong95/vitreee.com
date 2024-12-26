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
exports.MemberController = void 0;
const common_1 = require("@nestjs/common");
const account_decorator_1 = require("../auth/account.decorator");
const jwt_guard_provider_1 = require("../auth/jwt-guard.provider");
const member_dto_1 = require("../dto/member.dto");
const member_provider_1 = require("../providers/member.provider");
let MemberController = class MemberController {
    constructor(_memberProvider) {
        this._memberProvider = _memberProvider;
    }
    async findAll(request, response, _account) {
        try {
            const find = await this._memberProvider.findAllAsync(_account.id, request);
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
    async findOne(id, response, _account) {
        try {
            const find = await this._memberProvider.findOneAsync(_account.id, id);
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
    async createAsync(create, _account, response) {
        try {
            const find = await this._memberProvider.addAsync(_account.id, create);
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
    async updateAsync(update, id, response, _account) {
        try {
            const find = await this._memberProvider.updateAsync(_account.id, id, update);
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
    async removeAsync(id, response, _account) {
        try {
            const find = await this._memberProvider.removeAsync(_account.id, id);
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
    async restoreAsync(id, response, _account) {
        try {
            const result = await this._memberProvider.restoreAsync(_account.id, id);
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
exports.MemberController = MemberController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, account_decorator_1.AccountDetail)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, account_decorator_1.AccountDetailDTO]),
    __metadata("design:returntype", Promise)
], MemberController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, account_decorator_1.AccountDetail)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, account_decorator_1.AccountDetailDTO]),
    __metadata("design:returntype", Promise)
], MemberController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, account_decorator_1.AccountDetail)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [member_dto_1.CreateMemberDTO,
        account_decorator_1.AccountDetailDTO, Object]),
    __metadata("design:returntype", Promise)
], MemberController.prototype, "createAsync", null);
__decorate([
    (0, common_1.Post)(':id/update'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Res)()),
    __param(3, (0, account_decorator_1.AccountDetail)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [member_dto_1.UpdateMemberDTO, String, Object, account_decorator_1.AccountDetailDTO]),
    __metadata("design:returntype", Promise)
], MemberController.prototype, "updateAsync", null);
__decorate([
    (0, common_1.Delete)(':id/remove'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, account_decorator_1.AccountDetail)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, account_decorator_1.AccountDetailDTO]),
    __metadata("design:returntype", Promise)
], MemberController.prototype, "removeAsync", null);
__decorate([
    (0, common_1.Delete)(':id/restore'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, account_decorator_1.AccountDetail)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, account_decorator_1.AccountDetailDTO]),
    __metadata("design:returntype", Promise)
], MemberController.prototype, "restoreAsync", null);
exports.MemberController = MemberController = __decorate([
    (0, common_1.Controller)('member'),
    (0, common_1.UseGuards)(jwt_guard_provider_1.JwtAuthGuard),
    __metadata("design:paramtypes", [member_provider_1.MemberProvider])
], MemberController);
//# sourceMappingURL=member.controller.js.map