"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envConfig = exports.configuration = void 0;
const configuration = () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT, 10) || 3306,
        type: process.env.DB_TYPE || 'mysql',
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || '',
        name: process.env.DB_NAME || 'test',
    },
    jwt: {
        secret_key: process.env.SECRET_KEY || 'secret_key',
        expiration_time: parseInt(process.env.EXPIRATION_TIME, 10) || 3600,
    },
});
exports.configuration = configuration;
exports.envConfig = {
    isGlobal: true,
    load: [exports.configuration],
    envFilePath: '.env',
};
//# sourceMappingURL=configuration.js.map