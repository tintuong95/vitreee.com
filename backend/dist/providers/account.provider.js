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
exports.AccountProvider = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const account_1 = require("../entities/account");
const typeorm_2 = require("typeorm");
const _ = require("lodash");
const pagination_1 = require("../helper/pagination");
let AccountProvider = class AccountProvider {
    constructor(accountRepository) {
        this.accountRepository = accountRepository;
    }
    async findAllAsync(request) {
        const { skip, take, currentPage, perPage } = (0, pagination_1.queryHandler)(request.query);
        const result = this.accountRepository
            .createQueryBuilder('account')
            .where(`account.deletedAt IS NULL`)
            .orderBy('account.createdAt', 'DESC')
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
    async findOneAsync(id) {
        const find = await this.accountRepository
            .createQueryBuilder('account')
            .where(`account.deletedAt IS NULL`)
            .andWhere(`account.id = :id`, {
            id: `${id}`,
        })
            .getOne();
        if (!find)
            throw new common_1.NotFoundException('account Id ' + id + ' Not Found !');
        return find;
    }
    async addAsync(CreateAccountDto) {
        const create = this.accountRepository.create(CreateAccountDto);
        await this.accountRepository.save(create);
        return create;
    }
    async updateAsync(id, update) {
        const find = await this.accountRepository.findOneBy({ id });
        if (find) {
            _(update).forEach((val, key) => {
                if (val)
                    find[key] = val;
            });
            return await this.accountRepository.save(find);
        }
    }
    async removeAsync(id) {
        const find = await this.accountRepository.softDelete(id);
        return find;
    }
    async restoreAsync(id) {
        const find = await this.accountRepository.restore(id);
        return find;
    }
    async signInAsync(email, password) {
        const find = await this.accountRepository.findOneBy({ email });
        return find.isTruePassword(password) ? find : null;
    }
};
exports.AccountProvider = AccountProvider;
exports.AccountProvider = AccountProvider = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(account_1.Account)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AccountProvider);
//# sourceMappingURL=account.provider.js.map