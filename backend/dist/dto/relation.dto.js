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
exports.UpdateRelationDTO = exports.CreateRelationDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const relation_type_1 = require("../types/relation.type");
class CreateRelationDTO {
}
exports.CreateRelationDTO = CreateRelationDTO;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(relation_type_1.RELATION_MEMBER_TYPE, { message: 'Quan hệ không hợp lệ' }),
    (0, swagger_1.ApiProperty)({
        description: 'Quan hệ của người dùng',
        enum: relation_type_1.RELATION_MEMBER_TYPE,
        required: false,
    }),
    __metadata("design:type", String)
], CreateRelationDTO.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsUUID)('all', { message: 'ID tài khoản phải là UUID hợp lệ' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'ID tài khoản không được để trống' }),
    (0, swagger_1.ApiProperty)({
        description: 'ID của thành viên đầu tiên',
        example: 1,
    }),
    __metadata("design:type", String)
], CreateRelationDTO.prototype, "member_first_id", void 0);
__decorate([
    (0, class_validator_1.IsUUID)('all', { message: 'ID tài khoản phải là UUID hợp lệ' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'ID tài khoản không được để trống' }),
    (0, swagger_1.ApiProperty)({
        description: 'ID của thành viên thứ hai',
        example: 2,
    }),
    __metadata("design:type", String)
], CreateRelationDTO.prototype, "member_second_id", void 0);
class UpdateRelationDTO extends (0, swagger_1.PartialType)(CreateRelationDTO) {
}
exports.UpdateRelationDTO = UpdateRelationDTO;
//# sourceMappingURL=relation.dto.js.map