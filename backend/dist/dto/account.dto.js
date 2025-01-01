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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginDto = exports.AccountResponseDto = exports.UpdateAccountDto = exports.CreateAccountDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const account_type_1 = require("../types/account.type");
const index_type_1 = require("../types/index.type");
class CreateAccountDto {
}
exports.CreateAccountDto = CreateAccountDto;
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Email không hợp lệ' }),
    (0, class_validator_1.MinLength)(5, { message: 'Email phải có ít nhất 5 ký tự' }),
    (0, class_validator_1.MaxLength)(100, { message: 'Email không được vượt quá 100 ký tự' }),
    (0, swagger_1.ApiProperty)({ description: 'Địa chỉ email của người dùng' }),
    __metadata("design:type", String)
], CreateAccountDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Mật khẩu phải là chuỗi ký tự' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Mật khẩu không được để trống' }),
    (0, class_validator_1.MinLength)(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' }),
    (0, swagger_1.ApiProperty)({ description: 'Mật khẩu của người dùng' }),
    __metadata("design:type", String)
], CreateAccountDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Họ và tên phải là chuỗi ký tự' }),
    (0, class_validator_1.MinLength)(2, { message: 'Họ và tên phải có ít nhất 2 ký tự' }),
    (0, class_validator_1.MaxLength)(50, { message: 'Họ và tên không được vượt quá 50 ký tự' }),
    (0, swagger_1.ApiProperty)({ description: 'Họ và tên của người dùng' }),
    __metadata("design:type", String)
], CreateAccountDto.prototype, "fullName", void 0);
__decorate([
    (0, class_validator_1.Matches)(/^[0-9]{10,15}$/, {
        message: 'Số điện thoại phải có độ dài từ 10 đến 15 chữ số',
    }),
    (0, class_validator_1.IsString)({ message: 'Số điện thoại phải là chuỗi ký tự' }),
    (0, swagger_1.ApiProperty)({ description: 'Số điện thoại của người dùng' }),
    __metadata("design:type", String)
], CreateAccountDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Ảnh phải là một chuỗi ký tự' }),
    (0, swagger_1.ApiProperty)({
        description: 'Ảnh đại diện của người dùng (URL)',
        required: false,
    }),
    __metadata("design:type", String)
], CreateAccountDto.prototype, "photo", void 0);
__decorate([
    (0, class_validator_1.IsDateString)({}, { message: 'Ngày sinh phải là định dạng ngày hợp lệ (ISO8601)' }),
    (0, swagger_1.ApiProperty)({ description: 'Ngày sinh của người dùng (YYYY-MM-DD)' }),
    __metadata("design:type", String)
], CreateAccountDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(index_type_1.GENDER_TYPE, { message: 'Giới tính không hợp lệ' }),
    (0, swagger_1.ApiProperty)({ description: 'Giới tính của người dùng', enum: index_type_1.GENDER_TYPE }),
    __metadata("design:type", Number)
], CreateAccountDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(account_type_1.ACCOUNT_STATUS, { message: 'Trạng thái tài khoản không hợp lệ' }),
    (0, swagger_1.ApiProperty)({
        description: 'Trạng thái tài khoản của người dùng',
        enum: account_type_1.ACCOUNT_STATUS,
    }),
    __metadata("design:type", Number)
], CreateAccountDto.prototype, "status", void 0);
class UpdateAccountDto {
}
exports.UpdateAccountDto = UpdateAccountDto;
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Email không hợp lệ' }),
    (0, class_validator_1.MinLength)(5, { message: 'Email phải có ít nhất 5 ký tự' }),
    (0, class_validator_1.MaxLength)(100, { message: 'Email không được vượt quá 100 ký tự' }),
    (0, swagger_1.ApiProperty)({ description: 'Địa chỉ email của người dùng' }),
    __metadata("design:type", String)
], UpdateAccountDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Họ và tên phải là chuỗi ký tự' }),
    (0, class_validator_1.MinLength)(2, { message: 'Họ và tên phải có ít nhất 2 ký tự' }),
    (0, class_validator_1.MaxLength)(50, { message: 'Họ và tên không được vượt quá 50 ký tự' }),
    (0, swagger_1.ApiProperty)({ description: 'Họ và tên của người dùng', required: false }),
    __metadata("design:type", String)
], UpdateAccountDto.prototype, "fullName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)(/^[0-9]{10,15}$/, {
        message: 'Số điện thoại phải có độ dài từ 10 đến 15 chữ số',
    }),
    (0, class_validator_1.IsString)({ message: 'Số điện thoại phải là chuỗi ký tự' }),
    (0, swagger_1.ApiProperty)({ description: 'Số điện thoại của người dùng', required: false }),
    __metadata("design:type", String)
], UpdateAccountDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Ảnh phải là một chuỗi ký tự' }),
    (0, swagger_1.ApiProperty)({
        description: 'Ảnh đại diện của người dùng (URL)',
        required: false,
    }),
    __metadata("design:type", String)
], UpdateAccountDto.prototype, "photo", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)({}, { message: 'Ngày sinh phải là định dạng ngày hợp lệ (ISO8601)' }),
    (0, swagger_1.ApiProperty)({
        description: 'Ngày sinh của người dùng (YYYY-MM-DD)',
        required: false,
    }),
    __metadata("design:type", String)
], UpdateAccountDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(index_type_1.GENDER_TYPE, { message: 'Giới tính không hợp lệ' }),
    (0, swagger_1.ApiProperty)({
        description: 'Giới tính của người dùng',
        enum: index_type_1.GENDER_TYPE,
        required: false,
    }),
    __metadata("design:type", Number)
], UpdateAccountDto.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(account_type_1.ACCOUNT_STATUS, { message: 'Trạng thái tài khoản không hợp lệ' }),
    (0, swagger_1.ApiProperty)({
        description: 'Trạng thái tài khoản của người dùng',
        enum: account_type_1.ACCOUNT_STATUS,
        required: false,
    }),
    __metadata("design:type", Number)
], UpdateAccountDto.prototype, "status", void 0);
class AccountResponseDto {
}
exports.AccountResponseDto = AccountResponseDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({ description: 'ID duy nhất của người dùng (Number)' }),
    __metadata("design:type", Number)
], AccountResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Địa chỉ email của người dùng' }),
    __metadata("design:type", String)
], AccountResponseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Họ và tên của người dùng' }),
    __metadata("design:type", String)
], AccountResponseDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Số điện thoại của người dùng' }),
    __metadata("design:type", String)
], AccountResponseDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Ảnh đại diện của người dùng (URL)',
        required: false,
    }),
    __metadata("design:type", String)
], AccountResponseDto.prototype, "photo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ngày sinh của người dùng (YYYY-MM-DD)' }),
    __metadata("design:type", String)
], AccountResponseDto.prototype, "dateOfBirth", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Giới tính của người dùng', enum: index_type_1.GENDER_TYPE }),
    __metadata("design:type", Number)
], AccountResponseDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Trạng thái tài khoản của người dùng',
        enum: account_type_1.ACCOUNT_STATUS,
    }),
    __metadata("design:type", Number)
], AccountResponseDto.prototype, "status", void 0);
class LoginDto {
}
exports.LoginDto = LoginDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Địa chỉ email của người dùng',
        example: 'test@example.com',
    }),
    (0, class_validator_1.IsEmail)({}, { message: 'Email không hợp lệ' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email không được để trống' }),
    __metadata("design:type", String)
], LoginDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Mật khẩu của người dùng',
        example: 'password123',
    }),
    (0, class_validator_1.IsString)({ message: 'Mật khẩu phải là chuỗi ký tự' }),
    (0, class_validator_1.MinLength)(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Mật khẩu không được để trống' }),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);
//# sourceMappingURL=account.dto.js.map