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
exports.UpdateMemberDTO = exports.CreateMemberDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const index_type_1 = require("../types/index.type");
class CreateMemberDTO {
}
exports.CreateMemberDTO = CreateMemberDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'ID tài khoản không được để trống' }),
    (0, swagger_1.ApiProperty)({
        description: 'ID tài khoản liên kết với thành viên',
        example: '123e4567-e89b-12d3-a456-426614174001',
    }),
    __metadata("design:type", String)
], CreateMemberDTO.prototype, "familyTreeId", void 0);
__decorate([
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
], CreateMemberDTO.prototype, "fullName", void 0);
__decorate([
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
], CreateMemberDTO.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Email không hợp lệ' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email không được để trống' }),
    (0, swagger_1.ApiProperty)({
        description: 'Email của thành viên',
        example: 'example@example.com',
    }),
    __metadata("design:type", String)
], CreateMemberDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Địa chỉ phải là chuỗi' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Địa chỉ không được để trống' }),
    (0, class_validator_1.MinLength)(10, { message: 'Địa chỉ phải có ít nhất 10 ký tự' }),
    (0, class_validator_1.MaxLength)(100, { message: 'Địa chỉ không được vượt quá 100 ký tự' }),
    (0, swagger_1.ApiProperty)({
        description: 'Địa chỉ của thành viên',
        example: '123 Đường ABC, Thành phố XYZ',
    }),
    __metadata("design:type", String)
], CreateMemberDTO.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Avatar phải là chuỗi' }),
    (0, swagger_1.ApiProperty)({
        description: 'URL của avatar thành viên',
        example: 'https://example.com/avatar.png',
    }),
    __metadata("design:type", String)
], CreateMemberDTO.prototype, "avatar", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Mô tả phải là chuỗi' }),
    (0, class_validator_1.MinLength)(10, { message: 'Mô tả phải có ít nhất 10 ký tự' }),
    (0, class_validator_1.MaxLength)(200, { message: 'Mô tả không được vượt quá 200 ký tự' }),
    (0, swagger_1.ApiProperty)({
        description: 'Mô tả về thành viên',
        example: 'Thành viên năng động, yêu thích công việc nhóm.',
    }),
    __metadata("design:type", String)
], CreateMemberDTO.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)({}, { message: 'Ngày sinh phải là định dạng ngày hợp lệ (ISO8601)' }),
    (0, swagger_1.ApiProperty)({
        description: 'Ngày sinh của thành viên',
        example: '1990-01-01',
    }),
    __metadata("design:type", String)
], CreateMemberDTO.prototype, "birth_date", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)({}, { message: 'Ngày mất phải là định dạng ngày hợp lệ (ISO8601)' }),
    (0, swagger_1.ApiProperty)({
        description: 'Ngày mất của thành viên (nếu có)',
        example: '2050-01-01',
    }),
    __metadata("design:type", String)
], CreateMemberDTO.prototype, "dead_date", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(index_type_1.GENDER_TYPE, { message: 'Giới tính không hợp lệ' }),
    (0, swagger_1.ApiProperty)({
        description: 'Giới tính của người dùng',
        enum: index_type_1.GENDER_TYPE,
        required: false,
    }),
    __metadata("design:type", Number)
], CreateMemberDTO.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { message: 'Loại thành viên không hợp lệ' }),
    (0, swagger_1.ApiProperty)({
        description: 'Loại thành viên',
        required: false,
    }),
    __metadata("design:type", Number)
], CreateMemberDTO.prototype, "type", void 0);
class UpdateMemberDTO extends (0, swagger_1.PartialType)(CreateMemberDTO) {
}
exports.UpdateMemberDTO = UpdateMemberDTO;
//# sourceMappingURL=member.dto.js.map