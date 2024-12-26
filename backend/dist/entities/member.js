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
exports.Member = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const index_type_1 = require("../types/index.type");
const account_1 = require("./account");
const contants_1 = require("../contants");
const family_tree_1 = require("./family-tree");
const relation_1 = require("./relation");
let Member = class Member {
};
exports.Member = Member;
_a = contants_1.RE_ACCOUNT;
_b = contants_1.RE_FAMILY_TREE;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, swagger_1.ApiProperty)({
        description: 'ID của thành viên (UUID)',
        example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    __metadata("design:type", String)
], Member.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsUUID)('4', { message: 'ID tài khoản phải là UUID hợp lệ' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'ID tài khoản không được để trống' }),
    (0, swagger_1.ApiProperty)({
        description: 'ID tài khoản liên kết với thành viên',
        example: '123e4567-e89b-12d3-a456-426614174001',
    }),
    __metadata("design:type", String)
], Member.prototype, "accountId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsUUID)('4', { message: 'ID tài khoản phải là UUID hợp lệ' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'ID tài khoản không được để trống' }),
    (0, swagger_1.ApiProperty)({
        description: 'ID tài khoản liên kết với thành viên',
        example: '123e4567-e89b-12d3-a456-426614174001',
    }),
    __metadata("design:type", String)
], Member.prototype, "familyTreeId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsString)({ message: 'Họ và tên phải là chuỗi' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Họ và tên không được để trống' }),
    (0, class_validator_1.MinLength)(3, { message: 'Họ và tên phải có ít nhất 3 ký tự' }),
    (0, class_validator_1.MaxLength)(50, { message: 'Họ và tên không được vượt quá 50 ký tự' }),
    (0, swagger_1.ApiProperty)({
        description: 'Họ và tên của thành viên',
        example: 'Nguyễn Văn A',
        minLength: 3,
        maxLength: 50,
    }),
    __metadata("design:type", String)
], Member.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsString)({ message: 'Số điện thoại phải là chuỗi' }),
    (0, class_validator_1.Matches)(/^[0-9]{10,15}$/, {
        message: 'Số điện thoại phải có độ dài từ 10 đến 15 chữ số',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Số điện thoại không được để trống' }),
    (0, swagger_1.ApiProperty)({
        description: 'Số điện thoại của thành viên',
        example: '0123456789',
    }),
    __metadata("design:type", String)
], Member.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsEmail)({}, { message: 'Email không hợp lệ' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email không được để trống' }),
    (0, swagger_1.ApiProperty)({
        description: 'Email của thành viên',
        example: 'example@example.com',
    }),
    __metadata("design:type", String)
], Member.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsString)({ message: 'Địa chỉ phải là chuỗi' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Địa chỉ không được để trống' }),
    (0, class_validator_1.MinLength)(10, { message: 'Địa chỉ phải có ít nhất 10 ký tự' }),
    (0, class_validator_1.MaxLength)(100, { message: 'Địa chỉ không được vượt quá 100 ký tự' }),
    (0, swagger_1.ApiProperty)({
        description: 'Địa chỉ của thành viên',
        example: '123 Đường ABC, Thành phố XYZ',
    }),
    __metadata("design:type", String)
], Member.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Avatar phải là chuỗi' }),
    (0, swagger_1.ApiProperty)({
        description: 'URL của avatar thành viên',
        example: 'https://example.com/avatar.png',
    }),
    __metadata("design:type", String)
], Member.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Mô tả phải là chuỗi' }),
    (0, class_validator_1.MinLength)(10, { message: 'Mô tả phải có ít nhất 10 ký tự' }),
    (0, class_validator_1.MaxLength)(200, { message: 'Mô tả không được vượt quá 200 ký tự' }),
    (0, swagger_1.ApiProperty)({
        description: 'Mô tả về thành viên',
        example: 'Thành viên năng động, yêu thích công việc nhóm.',
    }),
    __metadata("design:type", String)
], Member.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsDateString)({}, { message: 'Ngày sinh phải là định dạng ngày hợp lệ (ISO8601)' }),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: 'Ngày sinh của thành viên',
        example: '1990-01-01',
    }),
    __metadata("design:type", String)
], Member.prototype, "birth_date", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsDateString)({}, { message: 'Ngày mất phải là định dạng ngày hợp lệ (ISO8601)' }),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: 'Ngày mất của thành viên (nếu có)',
        example: '2050-01-01',
    }),
    __metadata("design:type", String)
], Member.prototype, "dead_date", void 0);
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
], Member.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, swagger_1.ApiProperty)({
        description: 'Thời gian tạo thành viên',
        example: '2024-12-25T12:00:00Z',
    }),
    __metadata("design:type", Date)
], Member.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, swagger_1.ApiProperty)({
        description: 'Thời gian cập nhật thành viên gần nhất',
        example: '2024-12-25T12:00:00Z',
    }),
    __metadata("design:type", Date)
], Member.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    (0, swagger_1.ApiProperty)({
        description: 'Thời gian xóa thành viên (nếu có)',
        example: null,
    }),
    __metadata("design:type", Date)
], Member.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => account_1.Account, (Account) => Account[contants_1.RE_RELATION]),
    __metadata("design:type", account_1.Account)
], Member.prototype, _a, void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => family_tree_1.FamilyTree, (FamilyTree) => FamilyTree[contants_1.RE_MEMBER]),
    __metadata("design:type", family_tree_1.FamilyTree)
], Member.prototype, _b, void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => relation_1.Relation, (relation) => relation.member_first_id),
    (0, swagger_1.ApiProperty)({
        description: 'Mối quan hệ liên kết với thành viên đầu tiên',
        type: () => relation_1.Relation,
    }),
    __metadata("design:type", relation_1.Relation)
], Member.prototype, "relation_first", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => relation_1.Relation, (relation) => relation.member_second_id),
    (0, swagger_1.ApiProperty)({
        description: 'Mối quan hệ liên kết với thành viên thứ 2',
        type: () => relation_1.Relation,
    }),
    __metadata("design:type", relation_1.Relation)
], Member.prototype, "relation_second", void 0);
exports.Member = Member = __decorate([
    (0, typeorm_1.Entity)()
], Member);
//# sourceMappingURL=member.js.map