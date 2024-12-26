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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const account_decorator_1 = require("../auth/account.decorator");
const jwt_guard_provider_1 = require("../auth/jwt-guard.provider");
const account_dto_1 = require("../dto/account.dto");
const account_provider_1 = require("../providers/account.provider");
let AuthController = class AuthController {
    constructor(jwtService, _accountProvider) {
        this.jwtService = jwtService;
        this._accountProvider = _accountProvider;
    }
    async authLoginAsync(signin, response) {
        try {
            let account = await this._accountProvider.signInAsync(signin.email, signin.password);
            const temp = { ...account };
            delete temp.password;
            if (account) {
                const accessToken = this.jwtService.sign(temp);
                return response.status(common_1.HttpStatus.OK).json({
                    account: temp,
                    accessToken,
                    time: new Date().toString(),
                    message: 'Logging successfully!',
                });
            }
            else {
                return response.status(common_1.HttpStatus.FORBIDDEN).json({
                    message: 'FORBIDDEN!',
                });
            }
        }
        catch (error) {
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({
                message: 'BAD REQUEST!',
            });
        }
    }
    async authSignupAsync(signup, response) {
        try {
            const account = await this._accountProvider.addAsync(signup);
            if (account) {
                const object = {
                    id: account.id,
                    name: account.email,
                    status: account.status,
                    createdAt: account.createdAt,
                    updatedAt: account.updatedAt,
                };
                const accessToken = this.jwtService.sign(object);
                return response.status(common_1.HttpStatus.OK).json({
                    account: object,
                    accessToken,
                    time: new Date().toString(),
                    message: 'Signup successfully!',
                });
            }
            else {
                return response.status(common_1.HttpStatus.FORBIDDEN).json({
                    message: 'FORBIDDEN!',
                });
            }
        }
        catch (error) {
            return response.status(common_1.HttpStatus.BAD_REQUEST).json({
                message: 'Signup failture!',
            });
        }
    }
    async getProfile(user, response) {
        if (!user)
            return response.status(common_1.HttpStatus.FORBIDDEN).json({
                message: 'FORBIDDEN!',
            });
        const rs = await this._accountProvider.findOneAsync(user.id);
        delete rs.password;
        return response.status(common_1.HttpStatus.OK).json({
            account: rs,
            message: 'Profile successfully!',
        });
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [account_dto_1.LoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "authLoginAsync", null);
__decorate([
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [account_dto_1.CreateAccountDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "authSignupAsync", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_provider_1.JwtAuthGuard),
    (0, common_1.Get)('profile'),
    __param(0, (0, account_decorator_1.AccountDetail)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [account_decorator_1.AccountDetailDTO, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getProfile", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        account_provider_1.AccountProvider])
], AuthController);
//# sourceMappingURL=auth.controller.js.map