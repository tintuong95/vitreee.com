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
exports.UpdateFamilyTreeDTO = exports.CreateFamilyTreeDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const family_tree_type_1 = require("../types/family-tree.type");
class CreateFamilyTreeDTO {
}
exports.CreateFamilyTreeDTO = CreateFamilyTreeDTO;
__decorate([
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
], CreateFamilyTreeDTO.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Địa chỉ không được để trống' }),
    (0, class_validator_1.IsString)({ message: 'Địa chỉ phải là chuỗi' }),
    (0, class_validator_1.MinLength)(10, { message: 'Địa chỉ phải có ít nhất 10 ký tự' }),
    (0, class_validator_1.MaxLength)(100, { message: 'Địa chỉ không được vượt quá 100 ký tự' }),
    (0, swagger_1.ApiProperty)({
        description: 'Địa chỉ của cây phả hệ',
        example: '123 Đường ABC, Thành phố XYZ',
        minLength: 10,
        maxLength: 100,
    }),
    __metadata("design:type", String)
], CreateFamilyTreeDTO.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Mô tả không được để trống' }),
    (0, class_validator_1.IsString)({ message: 'Mô tả phải là chuỗi' }),
    (0, class_validator_1.MinLength)(20, { message: 'Mô tả phải có ít nhất 20 ký tự' }),
    (0, class_validator_1.MaxLength)(200, { message: 'Mô tả không được vượt quá 200 ký tự' }),
    (0, swagger_1.ApiProperty)({
        description: 'Mô tả về cây phả hệ',
        example: 'Đây là cây phả hệ dành cho gia đình và bạn bè, hoạt động hằng tuần.',
        minLength: 20,
        maxLength: 200,
    }),
    __metadata("design:type", String)
], CreateFamilyTreeDTO.prototype, "description", void 0);
class UpdateFamilyTreeDTO {
}
exports.UpdateFamilyTreeDTO = UpdateFamilyTreeDTO;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Tên cây phả hệ phải là chuỗi' }),
    (0, class_validator_1.MinLength)(3, { message: 'Tên cây phả hệ phải có ít nhất 3 ký tự' }),
    (0, class_validator_1.MaxLength)(50, { message: 'Tên cây phả hệ không được vượt quá 50 ký tự' }),
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Tên của cây phả hệ',
        example: 'cây phả hệ Gia đình',
        minLength: 3,
        maxLength: 50,
    }),
    __metadata("design:type", String)
], UpdateFamilyTreeDTO.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Địa chỉ phải là chuỗi' }),
    (0, class_validator_1.MinLength)(10, { message: 'Địa chỉ phải có ít nhất 10 ký tự' }),
    (0, class_validator_1.MaxLength)(100, { message: 'Địa chỉ không được vượt quá 100 ký tự' }),
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Địa chỉ của cây phả hệ',
        example: '123 Đường ABC, Thành phố XYZ',
        minLength: 10,
        maxLength: 100,
    }),
    __metadata("design:type", String)
], UpdateFamilyTreeDTO.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Mô tả phải là chuỗi' }),
    (0, class_validator_1.MinLength)(20, { message: 'Mô tả phải có ít nhất 20 ký tự' }),
    (0, class_validator_1.MaxLength)(200, { message: 'Mô tả không được vượt quá 200 ký tự' }),
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Mô tả về cây phả hệ',
        example: 'Đây là cây phả hệ dành cho gia đình và bạn bè, hoạt động hằng tuần.',
        minLength: 20,
        maxLength: 200,
    }),
    __metadata("design:type", String)
], UpdateFamilyTreeDTO.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(family_tree_type_1.FAMILY_TREE_STATUS, { message: 'Trạng thái dự án không hợp lệ' }),
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Trạng thái dự án',
        enum: family_tree_type_1.FAMILY_TREE_STATUS,
        example: family_tree_type_1.FAMILY_TREE_STATUS.unpublished,
    }),
    __metadata("design:type", Number)
], UpdateFamilyTreeDTO.prototype, "status", void 0);
//# sourceMappingURL=family-tree.dto.js.map