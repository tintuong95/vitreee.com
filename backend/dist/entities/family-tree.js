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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FamilyTree = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const family_tree_type_1 = require("../types/family-tree.type");
const account_1 = require("./account");
const contants_1 = require("../contants");
const member_1 = require("./member");
let FamilyTree = class FamilyTree {
};
exports.FamilyTree = FamilyTree;
_a = contants_1.RE_ACCOUNT;
_b = contants_1.RE_MEMBER;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, swagger_1.ApiProperty)({
        description: 'ID của mối quan hệ ',
        example: '1',
    }),
    __metadata("design:type", Number)
], FamilyTree.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Tên cây phả hệ không được để trống' }),
    (0, class_validator_1.IsString)({ message: 'Tên cây phả hệ phải là chuỗi' }),
    (0, class_validator_1.MinLength)(3, { message: 'Tên cây phả hệ phải có ít nhất 3 ký tự' }),
    (0, class_validator_1.MaxLength)(50, { message: 'Tên cây phả hệ không được vượt quá 50 ký tự' }),
    (0, swagger_1.ApiProperty)({
        description: 'Tên của cây phả hệ',
        example: 'cây phả hệ Gia đình',
        minLength: 3,
        maxLength: 50,
    }),
    __metadata("design:type", String)
], FamilyTree.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNumber)({}, { message: 'ID tài khoản phải là Number hợp lệ' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'ID tài khoản không được để trống' }),
    (0, swagger_1.ApiProperty)({
        description: 'ID của tài khoản liên kết với cây phả hệ',
        example: '123e4567-e89b-12d3-a456-426614174001',
    }),
    __metadata("design:type", Number)
], FamilyTree.prototype, "accountId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsString)({ message: 'Địa chỉ phải là chuỗi' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Địa chỉ không được để trống' }),
    (0, class_validator_1.MinLength)(10, { message: 'Địa chỉ phải có ít nhất 10 ký tự' }),
    (0, class_validator_1.MaxLength)(100, { message: 'Địa chỉ không được vượt quá 100 ký tự' }),
    (0, swagger_1.ApiProperty)({
        description: 'Địa chỉ của cây phả hệ',
        example: '123 Đường ABC, Thành phố XYZ',
        minLength: 10,
        maxLength: 100,
    }),
    __metadata("design:type", String)
], FamilyTree.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsString)({ message: 'Mô tả phải là chuỗi' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Mô tả không được để trống' }),
    (0, class_validator_1.MinLength)(20, { message: 'Mô tả phải có ít nhất 20 ký tự' }),
    (0, class_validator_1.MaxLength)(200, { message: 'Mô tả không được vượt quá 200 ký tự' }),
    (0, swagger_1.ApiProperty)({
        description: 'Mô tả về cây phả hệ',
        example: 'Đây là cây phả hệ dành cho gia đình và bạn bè, hoạt động hằng tuần.',
        minLength: 20,
        maxLength: 200,
    }),
    __metadata("design:type", String)
], FamilyTree.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: family_tree_type_1.FAMILY_TREE_STATUS,
        default: family_tree_type_1.FAMILY_TREE_STATUS.unpublished,
    }),
    (0, class_validator_1.IsEnum)(family_tree_type_1.FAMILY_TREE_STATUS, { message: 'Trạng thái dự án không hợp lệ' }),
    (0, swagger_1.ApiProperty)({
        description: 'Trạng thái dự án',
        enum: family_tree_type_1.FAMILY_TREE_STATUS,
        example: family_tree_type_1.FAMILY_TREE_STATUS.unpublished,
    }),
    __metadata("design:type", Number)
], FamilyTree.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, swagger_1.ApiProperty)({
        description: 'Thời gian tạo cây phả hệ',
        example: '2024-12-25T12:00:00Z',
    }),
    __metadata("design:type", Date)
], FamilyTree.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, swagger_1.ApiProperty)({
        description: 'Thời gian cập nhật cây phả hệ gần nhất',
        example: '2024-12-25T12:00:00Z',
    }),
    __metadata("design:type", Date)
], FamilyTree.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    (0, swagger_1.ApiProperty)({
        description: 'Thời gian xóa cây phả hệ (nếu có)',
        example: null,
    }),
    __metadata("design:type", Date)
], FamilyTree.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => account_1.Account, (Account) => Account[contants_1.RE_RELATION]),
    __metadata("design:type", account_1.Account)
], FamilyTree.prototype, _a, void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => member_1.Member, (Member) => Member[contants_1.RE_FAMILY_TREE]),
    __metadata("design:type", Array)
], FamilyTree.prototype, _b, void 0);
exports.FamilyTree = FamilyTree = __decorate([
    (0, typeorm_1.Entity)()
], FamilyTree);
//# sourceMappingURL=family-tree.js.map