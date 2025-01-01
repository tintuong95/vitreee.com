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
exports.MemberProvider = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const member_1 = require("../entities/member");
const typeorm_2 = require("typeorm");
const _ = require("lodash");
const pagination_1 = require("../helper/pagination");
let MemberProvider = class MemberProvider {
    constructor(memberRepository) {
        this.memberRepository = memberRepository;
    }
    async findAllAsync(accountId, request) {
        const { skip, take, currentPage, perPage } = (0, pagination_1.queryHandler)(request.query);
        const { familyTreeId = '' } = request.query;
        const result = this.memberRepository
            .createQueryBuilder('member')
            .where(`member.deletedAt IS NULL`)
            .andWhere(`member.accountId = :accountId`, {
            accountId: `${accountId}`,
        })
            .andWhere(`member.familyTreeId = :familyTreeId`, {
            familyTreeId: `${familyTreeId}`,
        })
            .orderBy('member.createdAt', 'DESC')
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
        const find = await this.memberRepository
            .createQueryBuilder('member')
            .where(`member.deletedAt IS NULL`)
            .andWhere(`member.id = :id`, {
            id: `${id}`,
        })
            .andWhere(`member.accountId = :accountId`, {
            accountId: `${accountId}`,
        })
            .getOne();
        if (!find)
            throw new common_1.NotFoundException('member Id ' + id + ' Not Found !');
        return find;
    }
    async addAsync(accountId, createMemberDTO) {
        const create = this.memberRepository.create({
            accountId,
            ...createMemberDTO,
        });
        await this.memberRepository.save(create);
        return create;
    }
    async updateAsync(accountId, id, update) {
        const find = await this.memberRepository
            .createQueryBuilder('member')
            .where(`member.deletedAt IS NULL`)
            .andWhere(`member.id = :id`, {
            id: `${id}`,
        })
            .andWhere(`member.accountId = :accountId`, {
            accountId: `${accountId}`,
        })
            .getOne();
        if (!find)
            throw new common_1.NotFoundException('member Id ' + id + ' Not Found !');
        else {
            {
                _(update).forEach((val, key) => {
                    if (val)
                        find[key] = val;
                });
                return await this.memberRepository.save(find);
            }
        }
    }
    async removeAsync(accountId, id) {
        const find = await this.memberRepository.softDelete({
            id,
            accountId,
        });
        if (find.affected > 0)
            return 'Deleted member Id ' + id + ' successfully !';
        throw new common_1.NotFoundException('member Id ' + id + ' Not Found !');
    }
    async restoreAsync(accountId, id) {
        const result = await this.memberRepository.restore({
            id,
            accountId,
        });
        if (result.affected > 0)
            return 'Restore member Id ' + id + ' successfully !';
        throw new common_1.NotFoundException('member Id ' + id + ' Not Found !');
    }
};
exports.MemberProvider = MemberProvider;
exports.MemberProvider = MemberProvider = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(member_1.Member)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MemberProvider);
//# sourceMappingURL=member.provider.js.map