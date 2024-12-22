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
const relation_dto_1 = require("../dto/relation.dto");
const relation_provider_1 = require("../providers/relation.provider");
let RelationController = class RelationController {
    constructor(_relationProvider) {
        this._relationProvider = _relationProvider;
    }
    async findAll(request) {
        try {
            return await this._relationProvider.findAllAsync(request);
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException(error.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        try {
            return await this._relationProvider.findOneAsync(id);
        }
        catch (error) {
            throw new common_1.HttpException(error.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createAsync(create) {
        try {
            return await this._relationProvider.addAsync(create);
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException(error.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateAsync(update, id) {
        try {
            return await this._relationProvider.updateAsync(id, update);
        }
        catch (error) {
            throw new common_1.HttpException(error.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async removeAsync(id) {
        try {
            return await this._relationProvider.removeAsync(id);
        }
        catch (error) {
            throw new common_1.HttpException(error.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async restoreAsync(id) {
        try {
            return await this._relationProvider.restoreAsync(id);
        }
        catch (error) {
            throw new common_1.HttpException(error.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.RelationController = RelationController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RelationController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RelationController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [relation_dto_1.CreateRelationDTO]),
    __metadata("design:returntype", Promise)
], RelationController.prototype, "createAsync", null);
__decorate([
    (0, common_1.Post)(':id/update'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [relation_dto_1.UpdateRelationDTO, String]),
    __metadata("design:returntype", Promise)
], RelationController.prototype, "updateAsync", null);
__decorate([
    (0, common_1.Delete)(':id/remove'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RelationController.prototype, "removeAsync", null);
__decorate([
    (0, common_1.Delete)(':id/restore'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RelationController.prototype, "restoreAsync", null);
exports.RelationController = RelationController = __decorate([
    (0, common_1.Controller)('relation'),
    __metadata("design:paramtypes", [relation_provider_1.RelationProvider])
], RelationController);
//# sourceMappingURL=relation.controller.js.map