"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const fs = require("fs-extra");
const database = (configService) => ({
    autoLoadEntities: true,
    type: configService.get('database.type'),
    host: configService.get('database.host'),
    port: configService.get('database.port'),
    username: configService.get('database.username'),
    password: configService.get('database.password'),
    database: configService.get('database.name'),
    migrations: ['src/database/migration/*{.ts,.js}'],
    ssl: {
        minVersion: 'TLSv1.2',
        ca: fs.readFileSync(`./isrgrootx1.pem`),
    },
    synchronize: false,
    migrationsRun: false,
    dropSchema: false,
    logging: true,
});
exports.database = database;
//# sourceMappingURL=database.js.map