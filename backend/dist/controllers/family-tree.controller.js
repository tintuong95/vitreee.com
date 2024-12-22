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
exports.FamilyTreeController = void 0;
const common_1 = require("@nestjs/common");
const account_decorator_1 = require("../auth/account.decorator");
const jwt_guard_provider_1 = require("../auth/jwt-guard.provider");
const family_tree_dto_1 = require("../dto/family-tree.dto");
const family_tree_provider_1 = require("../providers/family-tree.provider");
let FamilyTreeController = class FamilyTreeController {
    constructor(_familyTreeProvider) {
        this._familyTreeProvider = _familyTreeProvider;
    }
    async findAll(request, response) {
        try {
            const find = await this._familyTreeProvider.findAllAsync(request);
            return response.status(common_1.HttpStatus.OK).json({
                message: 'All family-tree data found successfully',
                data: find
            });
        }
        catch (error) {
            console.log(error);
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error! family-tree not found!',
                error: 'Bad Request',
            });
        }
    }
    async findOne(id) {
        try {
            return await this._familyTreeProvider.findOneAsync(id);
        }
        catch (error) {
            throw new common_1.HttpException(error.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createAsync(create, _account) {
        try {
            console.log("_account", _account);
            return await this._familyTreeProvider.addAsync(_account.id, create);
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException(error.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateAsync(update, id) {
        try {
            return await this._familyTreeProvider.updateAsync(id, update);
        }
        catch (error) {
            throw new common_1.HttpException(error.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async removeAsync(id) {
        try {
            return await this._familyTreeProvider.removeAsync(id);
        }
        catch (error) {
            throw new common_1.HttpException(error.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async restoreAsync(id) {
        try {
            return await this._familyTreeProvider.restoreAsync(id);
        }
        catch (error) {
            throw new common_1.HttpException(error.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.FamilyTreeController = FamilyTreeController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FamilyTreeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FamilyTreeController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, account_decorator_1.AccountDetail)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [family_tree_dto_1.CreateFamilyTreeDTO, account_decorator_1.AccountDetailDTO]),
    __metadata("design:returntype", Promise)
], FamilyTreeController.prototype, "createAsync", null);
__decorate([
    (0, common_1.Post)(':id/update'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [family_tree_dto_1.UpdateFamilyTreeDTO, String]),
    __metadata("design:returntype", Promise)
], FamilyTreeController.prototype, "updateAsync", null);
__decorate([
    (0, common_1.Delete)(':id/remove'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FamilyTreeController.prototype, "removeAsync", null);
__decorate([
    (0, common_1.Delete)(':id/restore'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FamilyTreeController.prototype, "restoreAsync", null);
exports.FamilyTreeController = FamilyTreeController = __decorate([
    (0, common_1.Controller)('familyTree'),
    (0, common_1.UseGuards)(jwt_guard_provider_1.JwtAuthGuard),
    __metadata("design:paramtypes", [family_tree_provider_1.FamilyTreeProvider])
], FamilyTreeController);
//# sourceMappingURL=family-tree.controller.js.map