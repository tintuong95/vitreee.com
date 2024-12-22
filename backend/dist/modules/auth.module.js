"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_controller_1 = require("../controllers/auth.controller");
const account_module_1 = require("./account.module");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const jwt_strategy_provider_1 = require("../auth/jwt-strategy.provider");
const config_1 = require("@nestjs/config");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [passport_1.PassportModule,
            account_module_1.AccountModule,
            jwt_1.JwtModule.registerAsync({
                useFactory: (configService) => {
                    return {
                        secret: configService.get('jwt.secret_key'),
                        signOptions: {
                            expiresIn: configService.get('jwt.expiration_time'),
                        },
                    };
                },
                inject: [config_1.ConfigService],
            }),],
        controllers: [auth_controller_1.AuthController],
        providers: [jwt_strategy_provider_1.JwtStrategyProvider],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map