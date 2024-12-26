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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const bcrypt = require("bcryptjs");
const account_type_1 = require("../types/account.type");
const index_type_1 = require("../types/index.type");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const contants_1 = require("../contants");
const member_1 = require("./member");
const family_tree_1 = require("./family-tree");
const relation_1 = require("./relation");
let Account = class Account {
    hash() {
        this.password = bcrypt.hashSync(this.password, 10);
    }
    isTruePassword(password) {
        return bcrypt.compareSync(password, this.password);
    }
};
exports.Account = Account;
_a = contants_1.RE_MEMBER;
_b = contants_1.RE_FAMILY_TREE;
_c = contants_1.RE_RELATION;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, class_validator_1.IsUUID)(),
    (0, swagger_1.ApiProperty)({
        description: 'ID duy nhất của người dùng (UUID)',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    __metadata("design:type", String)
], Account.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    (0, class_validator_1.MinLength)(5, { message: 'Email phải có ít nhất 5 ký tự' }),
    (0, class_validator_1.MaxLength)(100, { message: 'Email không được vượt quá 100 ký tự' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Email không hợp lệ' }),
    (0, swagger_1.ApiProperty)({
        description: 'Địa chỉ email của người dùng',
        example: 'test@example.com',
    }),
    __metadata("design:type", String)
], Account.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.MinLength)(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' }),
    (0, class_validator_1.IsString)({ message: 'Mật khẩu phải là chuỗi ký tự' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Mật khẩu không được để trống' }),
    (0, swagger_1.ApiProperty)({
        description: 'Mật khẩu của người dùng',
        example: 'password123',
    }),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], Account.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.MinLength)(2, { message: 'Họ và tên phải có ít nhất 2 ký tự' }),
    (0, class_validator_1.MaxLength)(50, { message: 'Họ và tên không được vượt quá 50 ký tự' }),
    (0, class_validator_1.IsString)({ message: 'Họ và tên phải là chuỗi ký tự' }),
    (0, swagger_1.ApiProperty)({
        description: 'Họ và tên của người dùng',
        example: 'Nguyen Van A',
    }),
    __metadata("design:type", String)
], Account.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.Matches)(/^[0-9]{10,15}$/, {
        message: 'Số điện thoại phải có độ dài từ 10 đến 15 chữ số',
    }),
    (0, class_validator_1.IsString)({ message: 'Số điện thoại phải là chuỗi ký tự' }),
    (0, swagger_1.ApiProperty)({
        description: 'Số điện thoại của người dùng',
        example: '0909123456',
    }),
    __metadata("design:type", String)
], Account.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Ảnh phải là một chuỗi ký tự' }),
    (0, swagger_1.ApiProperty)({
        description: 'Ảnh đại diện của người dùng (URL)',
        example: 'https://example.com/photo.jpg',
    }),
    __metadata("design:type", String)
], Account.prototype, "photo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsDateString)({}, { message: 'Ngày sinh phải là định dạng ngày hợp lệ (ISO8601)' }),
    (0, swagger_1.ApiProperty)({
        description: 'Ngày sinh của người dùng (YYYY-MM-DD)',
        example: '1990-01-01',
    }),
    __metadata("design:type", String)
], Account.prototype, "dateOfBirth", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: index_type_1.GENDER_TYPE,
        default: index_type_1.GENDER_TYPE.Male,
    }),
    (0, class_validator_1.IsEnum)(index_type_1.GENDER_TYPE, { message: 'Giới tính không hợp lệ' }),
    (0, swagger_1.ApiProperty)({
        description: 'Giới tính của người dùng',
        enum: index_type_1.GENDER_TYPE,
        example: index_type_1.GENDER_TYPE.Male,
    }),
    __metadata("design:type", Number)
], Account.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: account_type_1.ACCOUNT_STATUS,
        default: account_type_1.ACCOUNT_STATUS.pending,
    }),
    (0, class_validator_1.IsEnum)(account_type_1.ACCOUNT_STATUS, { message: 'Trạng thái tài khoản không hợp lệ' }),
    (0, swagger_1.ApiProperty)({
        description: 'Trạng thái tài khoản của người dùng',
        enum: account_type_1.ACCOUNT_STATUS,
        example: account_type_1.ACCOUNT_STATUS.actived,
    }),
    __metadata("design:type", Number)
], Account.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, swagger_1.ApiProperty)({
        description: 'Thời gian tạo người dùng',
        example: '2024-12-25T12:00:00Z',
    }),
    __metadata("design:type", Date)
], Account.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, swagger_1.ApiProperty)({
        description: 'Thời gian cập nhật người dùng gần nhất',
        example: '2024-12-25T12:00:00Z',
    }),
    __metadata("design:type", Date)
], Account.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    (0, swagger_1.ApiProperty)({
        description: 'Thời gian xóa người dùng (nếu có)',
        example: null,
    }),
    __metadata("design:type", Date)
], Account.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Account.prototype, "hash", null);
__decorate([
    (0, typeorm_1.OneToMany)(() => member_1.Member, (Member) => Member[contants_1.RE_ACCOUNT]),
    __metadata("design:type", Array)
], Account.prototype, _a, void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => family_tree_1.FamilyTree, (FamilyTree) => FamilyTree[contants_1.RE_ACCOUNT]),
    __metadata("design:type", Array)
], Account.prototype, _b, void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => relation_1.Relation, (Relation) => Relation[contants_1.RE_ACCOUNT]),
    __metadata("design:type", Array)
], Account.prototype, _c, void 0);
exports.Account = Account = __decorate([
    (0, typeorm_1.Entity)()
], Account);
//# sourceMappingURL=account.js.map