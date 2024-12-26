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
const pagination_1 = require("../helper/pagination");
let RelationProvider = class RelationProvider {
    constructor(relationRepository) {
        this.relationRepository = relationRepository;
    }
    async findAllAsync(accountId, request) {
        const { skip, take, currentPage, perPage } = (0, pagination_1.queryHandler)(request.query);
        const result = this.relationRepository
            .createQueryBuilder('relation')
            .where(`relation.deletedAt IS NULL`)
            .andWhere(`relation.accountId = :accountId`, {
            accountId: `${accountId}`,
        })
            .orderBy('relation.createdAt', 'DESC')
            .skip(+skip)
            .take(+take);
        const count = await result.getCount();
        const list = await result.getMany();
        if (count == 0)
            throw new common_1.HttpException('Not Found', common_1.HttpStatus.NOT_FOUND);
        return {
            count,
            list,
            currentPage,
            perPage,
        };
    }
    async findOneAsync(accountId, id) {
        const find = await this.relationRepository
            .createQueryBuilder('relation')
            .where(`relation.deletedAt IS NULL`)
            .andWhere(`relation.id = :id`, {
            id: `${id}`,
        })
            .andWhere(`relation.accountId = :accountId`, {
            accountId: `${accountId}`,
        })
            .getOne();
        if (!find)
            throw new common_1.NotFoundException('relation Id ' + id + ' Not Found !');
        return find;
    }
    async addAsync(accountId, createRelationDTO) {
        const create = this.relationRepository.create({
            accountId,
            ...createRelationDTO,
        });
        await this.relationRepository.save(create);
        return create;
    }
    async updateAsync(accountId, id, update) {
        const find = await this.relationRepository
            .createQueryBuilder('relation')
            .where(`relation.deletedAt IS NULL`)
            .andWhere(`relation.id = :id`, {
            id: `${id}`,
        })
            .andWhere(`relation.accountId = :accountId`, {
            accountId: `${accountId}`,
        })
            .getOne();
        if (!find)
            throw new common_1.NotFoundException('relation Id ' + id + ' Not Found !');
        else {
            {
                _(update).forEach((val, key) => {
                    if (val)
                        find[key] = val;
                });
                return await this.relationRepository.save(find);
            }
        }
    }
    async removeAsync(accountId, id) {
        const find = await this.relationRepository.softDelete({
            id,
            accountId,
        });
        if (find.affected > 0)
            return 'Deleted relation Id ' + id + ' successfully !';
        throw new common_1.NotFoundException('relation Id ' + id + ' Not Found !');
    }
    async restoreAsync(accountId, id) {
        const result = await this.relationRepository.restore({
            id,
            accountId,
        });
        if (result.affected > 0)
            return 'Restore relation Id ' + id + ' successfully !';
        throw new common_1.NotFoundException('relation Id ' + id + ' Not Found !');
    }
};
exports.RelationProvider = RelationProvider;
exports.RelationProvider = RelationProvider = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(relation_1.Relation)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RelationProvider);
//# sourceMappingURL=relation.provider.js.map