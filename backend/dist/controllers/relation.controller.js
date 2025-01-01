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
exports.RelationController = void 0;
const common_1 = require("@nestjs/common");
const account_decorator_1 = require("../auth/account.decorator");
const jwt_guard_provider_1 = require("../auth/jwt-guard.provider");
const relation_dto_1 = require("../dto/relation.dto");
const relation_provider_1 = require("../providers/relation.provider");
let RelationController = class RelationController {
    constructor(_relationProvider) {
        this._relationProvider = _relationProvider;
    }
    async findAll(request, response, _account) {
        try {
            const find = await this._relationProvider.findAllAsync(_account.id, request);
            if (find.count == 0) {
                return response.status(common_1.HttpStatus.OK).json({
                    message: 'Data not found!',
                });
            }
            else {
                return response.status(common_1.HttpStatus.OK).json({
                    message: 'Find data successfully!',
                    data: find,
                });
            }
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
            const find = await this._relationProvider.findOneAsync(_account.id, id);
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
    async createAsync(create, response, _account) {
        try {
            const find = await this._relationProvider.addAsync(_account.id, create);
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
            const find = await this._relationProvider.updateAsync(_account.id, id, update);
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
            const find = await this._relationProvider.removeAsync(_account.id, id);
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
            const result = await this._relationProvider.restoreAsync(_account.id, id);
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
exports.RelationController = RelationController;
__decorate([
    (0, common_1.Get)('list'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, account_decorator_1.AccountDetail)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, account_decorator_1.AccountDetailDTO]),
    __metadata("design:returntype", Promise)
], RelationController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id/details'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, account_decorator_1.AccountDetail)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, account_decorator_1.AccountDetailDTO]),
    __metadata("design:returntype", Promise)
], RelationController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, account_decorator_1.AccountDetail)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [relation_dto_1.CreateRelationDTO, Object, account_decorator_1.AccountDetailDTO]),
    __metadata("design:returntype", Promise)
], RelationController.prototype, "createAsync", null);
__decorate([
    (0, common_1.Post)(':id/update'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Res)()),
    __param(3, (0, account_decorator_1.AccountDetail)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [relation_dto_1.UpdateRelationDTO, Number, Object, account_decorator_1.AccountDetailDTO]),
    __metadata("design:returntype", Promise)
], RelationController.prototype, "updateAsync", null);
__decorate([
    (0, common_1.Delete)(':id/remove'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, account_decorator_1.AccountDetail)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, account_decorator_1.AccountDetailDTO]),
    __metadata("design:returntype", Promise)
], RelationController.prototype, "removeAsync", null);
__decorate([
    (0, common_1.Delete)(':id/restore'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, account_decorator_1.AccountDetail)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, account_decorator_1.AccountDetailDTO]),
    __metadata("design:returntype", Promise)
], RelationController.prototype, "restoreAsync", null);
exports.RelationController = RelationController = __decorate([
    (0, common_1.Controller)('relation'),
    (0, common_1.UseGuards)(jwt_guard_provider_1.JwtAuthGuard),
    __metadata("design:paramtypes", [relation_provider_1.RelationProvider])
], RelationController);
//# sourceMappingURL=relation.controller.js.map