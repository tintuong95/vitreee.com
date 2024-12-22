"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const family_tree_module_1 = require("./modules/family-tree.module");
const typeorm_1 = require("@nestjs/typeorm");
const account_module_1 = require("./modules/account.module");
const member_module_1 = require("./modules/member.module");
const relation_module_1 = require("./modules/relation.module");
const auth_module_1 = require("./modules/auth.module");
const config_1 = require("@nestjs/config");
const configuration_1 = require("./config/configuration");
const core_1 = require("@nestjs/core");
const database_1 = require("./config/database");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(configuration_1.envConfig),
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: (configService) => (0, database_1.database)(configService),
                inject: [config_1.ConfigService],
            }),
            auth_module_1.AuthModule, family_tree_module_1.FamilyTreeModule, account_module_1.AccountModule, member_module_1.MemberModule, relation_module_1.RelationModule
        ],
        providers: [
            {
                provide: core_1.APP_PIPE,
                useFactory: () => new common_1.ValidationPipe({
                    whitelist: true,
                    transform: true,
                    forbidNonWhitelisted: true,
                    transformOptions: {
                        enableImplicitConversion: true,
                    },
                }),
            },
        ]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map