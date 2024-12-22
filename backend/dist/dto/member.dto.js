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
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateMemberDTO {
}
exports.CreateMemberDTO = CreateMemberDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.MaxLength)(25),
    __metadata("design:type", String)
], CreateMemberDTO.prototype, "fullName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateMemberDTO.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateMemberDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateMemberDTO.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CreateMemberDTO.prototype, "avatar", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateMemberDTO.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateMemberDTO.prototype, "birth_date", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateMemberDTO.prototype, "dead_date", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], CreateMemberDTO.prototype, "gender", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], CreateMemberDTO.prototype, "status", void 0);
class UpdateMemberDTO extends (0, swagger_1.PartialType)(CreateMemberDTO) {
}
exports.UpdateMemberDTO = UpdateMemberDTO;
//# sourceMappingURL=member.dto.js.map