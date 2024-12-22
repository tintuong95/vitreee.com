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
const member_dto_1 = require("../dto/member.dto");
const member_provider_1 = require("../providers/member.provider");
let MemberController = class MemberController {
    constructor(_memberProvider) {
        this._memberProvider = _memberProvider;
    }
    async findAll(request) {
        try {
            return await this._memberProvider.findAllAsync(request);
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException(error.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        try {
            return await this._memberProvider.findOneAsync(id);
        }
        catch (error) {
            throw new common_1.HttpException(error.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createAsync(create) {
        try {
            return await this._memberProvider.addAsync(create);
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException(error.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateAsync(update, id) {
        try {
            return await this._memberProvider.updateAsync(id, update);
        }
        catch (error) {
            throw new common_1.HttpException(error.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async removeAsync(id) {
        try {
            return await this._memberProvider.removeAsync(id);
        }
        catch (error) {
            throw new common_1.HttpException(error.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async restoreAsync(id) {
        try {
            return await this._memberProvider.restoreAsync(id);
        }
        catch (error) {
            throw new common_1.HttpException(error.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.MemberController = MemberController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MemberController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MemberController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [member_dto_1.CreateMemberDTO]),
    __metadata("design:returntype", Promise)
], MemberController.prototype, "createAsync", null);
__decorate([
    (0, common_1.Post)(':id/update'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [member_dto_1.UpdateMemberDTO, String]),
    __metadata("design:returntype", Promise)
], MemberController.prototype, "updateAsync", null);
__decorate([
    (0, common_1.Delete)(':id/remove'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MemberController.prototype, "removeAsync", null);
__decorate([
    (0, common_1.Delete)(':id/restore'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MemberController.prototype, "restoreAsync", null);
exports.MemberController = MemberController = __decorate([
    (0, common_1.Controller)('member'),
    __metadata("design:paramtypes", [member_provider_1.MemberProvider])
], MemberController);
//# sourceMappingURL=member.controller.js.map