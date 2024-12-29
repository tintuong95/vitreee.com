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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Relation = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const contants_1 = require("../contants");
const relation_type_1 = require("../types/relation.type");
const typeorm_1 = require("typeorm");
const account_1 = require("./account");
let Relation = class Relation {
};
exports.Relation = Relation;
_a = contants_1.RE_ACCOUNT;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, swagger_1.ApiProperty)({
        description: 'ID của mối quan hệ (UUID)',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    __metadata("design:type", String)
], Relation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsUUID)('4', { message: 'ID tài khoản phải là UUID hợp lệ' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'ID tài khoản không được để trống' }),
    (0, swagger_1.ApiProperty)({
        description: 'ID tài khoản liên kết với mối quan hệ',
        example: '123e4567-e89b-12d3-a456-426614174001',
    }),
    __metadata("design:type", String)
], Relation.prototype, "accountId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: relation_type_1.RELATION_MEMBER_TYPE,
        default: relation_type_1.RELATION_MEMBER_TYPE.parent,
    }),
    (0, class_validator_1.IsEnum)(relation_type_1.RELATION_MEMBER_TYPE, { message: 'Quan hệ không hợp lệ' }),
    (0, swagger_1.ApiProperty)({
        description: 'Quan hệ của người dùng',
        enum: relation_type_1.RELATION_MEMBER_TYPE,
        example: relation_type_1.RELATION_MEMBER_TYPE.parent,
    }),
    __metadata("design:type", String)
], Relation.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.JoinColumn)({ name: 'member_first_id' }),
    (0, class_validator_1.IsUUID)('4', { message: 'ID tài khoản phải là UUID hợp lệ' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'ID tài khoản không được để trống' }),
    (0, swagger_1.ApiProperty)({
        description: 'ID tài khoản liên kết với thành viên',
        example: '123e4567-e89b-12d3-a456-426614174001',
    }),
    __metadata("design:type", String)
], Relation.prototype, "member_first_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.JoinColumn)({ name: 'member_second_id' }),
    (0, class_validator_1.IsUUID)('4', { message: 'ID tài khoản phải là UUID hợp lệ' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'ID tài khoản không được để trống' }),
    (0, swagger_1.ApiProperty)({
        description: 'ID tài khoản liên kết với thành viên',
        example: '123e4567-e89b-12d3-a456-426614174001',
    }),
    __metadata("design:type", String)
], Relation.prototype, "member_second_id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, swagger_1.ApiProperty)({
        description: 'Thời gian tạo mối quan hệ',
        example: '2024-12-25T12:00:00Z',
    }),
    __metadata("design:type", Date)
], Relation.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, swagger_1.ApiProperty)({
        description: 'Thời gian cập nhật mối quan hệ gần nhất',
        example: '2024-12-26T12:00:00Z',
    }),
    __metadata("design:type", Date)
], Relation.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    (0, swagger_1.ApiProperty)({
        description: 'Thời gian xóa mối quan hệ (nếu có)',
        example: null,
    }),
    __metadata("design:type", Date)
], Relation.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => account_1.Account, (Account) => Account[contants_1.RE_RELATION]),
    __metadata("design:type", account_1.Account)
], Relation.prototype, _a, void 0);
exports.Relation = Relation = __decorate([
    (0, typeorm_1.Entity)()
], Relation);
//# sourceMappingURL=relation.js.map