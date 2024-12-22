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
const account_dto_1 = require("../dto/account.dto");
const account_provider_1 = require("../providers/account.provider");
let AuthController = class AuthController {
    constructor(jwtService, _accountProvider) {
        this.jwtService = jwtService;
        this._accountProvider = _accountProvider;
    }
    async authLoginAsync(signin) {
        try {
            const account = await this._accountProvider.signInAsync(signin.email, signin.password);
            if (account) {
                const object = {
                    id: account.id,
                    name: account.email,
                    status: account.status,
                    createdAt: account.createdAt,
                    updatedAt: account.updatedAt,
                };
                const accessToken = this.jwtService.sign(object);
                return {
                    acoount: object,
                    accessToken,
                    time: new Date().toString(),
                    message: "Logging successfully!"
                };
            }
            else {
                throw new common_1.HttpException('FORBIEDEN', common_1.HttpStatus.FORBIDDEN);
            }
        }
        catch (error) {
            throw new common_1.HttpException(error.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async authSignupAsync(signup) {
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
                return {
                    acoount: object,
                    accessToken,
                    time: new Date().toString(),
                    message: "Signup successfully!"
                };
            }
            else {
                throw new common_1.HttpException('FORBIEDEN', common_1.HttpStatus.FORBIDDEN);
            }
        }
        catch (error) {
            throw new common_1.HttpException(error.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "authLoginAsync", null);
__decorate([
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [account_dto_1.CreateAccountDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "authSignupAsync", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        account_provider_1.AccountProvider])
], AuthController);
//# sourceMappingURL=auth.controller.js.map