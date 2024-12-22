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
exports.FamilyTreeProvider = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const family_tree_1 = require("../entities/family-tree");
const typeorm_2 = require("typeorm");
const _ = require("lodash");
let FamilyTreeProvider = class FamilyTreeProvider {
    constructor(familyTreesRepository) {
        this.familyTreesRepository = familyTreesRepository;
    }
    async findAllAsync(request) {
        const { currentPage = 1, pageSize = 100 } = request.query;
        const skip = (+currentPage - 1) * +pageSize;
        const result = this.familyTreesRepository
            .createQueryBuilder('family_tree')
            .where(`family_tree.deletedAt IS NULL`)
            .orderBy('family_tree.createdAt', 'DESC')
            .skip(+skip)
            .take(+pageSize);
        const count = await result.getCount();
        const list = await result.getMany();
        return {
            count,
            list,
        };
    }
    async findOneAsync(id) {
        return this.familyTreesRepository.findOneBy({ id });
    }
    async addAsync(accountId, createFamilyTreeDTO) {
        const create = this.familyTreesRepository.create({
            accountId,
            ...createFamilyTreeDTO
        });
        await this.familyTreesRepository.save(create);
        return create;
    }
    async updateAsync(id, update) {
        const find = await this.familyTreesRepository.findOneBy({ id });
        if (find) {
            _(update).forEach((val, key) => {
                if (val)
                    find[key] = val;
            });
            return await this.familyTreesRepository.save(find);
        }
    }
    async removeAsync(id) {
        const find = await this.familyTreesRepository.softDelete(id);
        return find;
    }
    async restoreAsync(id) {
        const find = await this.familyTreesRepository.restore(id);
        return find;
    }
};
exports.FamilyTreeProvider = FamilyTreeProvider;
exports.FamilyTreeProvider = FamilyTreeProvider = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(family_tree_1.FamilyTree)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FamilyTreeProvider);
//# sourceMappingURL=family-tree.provider.js.map