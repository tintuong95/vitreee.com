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
exports.RelationProvider = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const relation_1 = require("../entities/relation");
const typeorm_2 = require("typeorm");
const _ = require("lodash");
let RelationProvider = class RelationProvider {
    constructor(relationRepository) {
        this.relationRepository = relationRepository;
    }
    async findAllAsync(request) {
        const { currentPage = 1, pageSize = 100 } = request.query;
        const skip = (+currentPage - 1) * +pageSize;
        const result = this.relationRepository
            .createQueryBuilder('family_tree')
            .where(`family_tree.deletedAt IS NULL`)
            .orderBy('family_tree.createdAt', 'DESC')
            .skip(+skip)
            .take(+pageSize);
        const count = await result.getCount();
        const data = await result.getMany();
        return {
            count,
            data,
        };
    }
    async findOneAsync(id) {
        return this.relationRepository.findOneBy({ id });
    }
    async addAsync(createRelationDTO) {
        const create = this.relationRepository.create(createRelationDTO);
        await this.relationRepository.save(create);
        return create;
    }
    async updateAsync(id, update) {
        const find = await this.relationRepository.findOneBy({ id });
        if (find) {
            _(update).forEach((val, key) => {
                if (val)
                    find[key] = val;
            });
            return await this.relationRepository.save(find);
        }
    }
    async removeAsync(id) {
        const find = await this.relationRepository.softDelete(id);
        return find;
    }
    async restoreAsync(id) {
        const find = await this.relationRepository.restore(id);
        return find;
    }
};
exports.RelationProvider = RelationProvider;
exports.RelationProvider = RelationProvider = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(relation_1.Relation)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RelationProvider);
//# sourceMappingURL=relation.provider.js.map