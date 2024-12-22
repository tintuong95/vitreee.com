import { ConfigModuleOptions } from '@nestjs/config';

export const configuration = () => ({
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
  // payos: {
  //   client_id: process.env.PAYOS_CLIENT_ID || 'client_id',
  //   api_key: process.env.PAYOS_API_KEY || 'api_key',
  //   checksum_key: process.env.PAYOS_CHECKSUM_KEY || 'checksum_key',
  //   url: process.env.PAYOS_URL || 'url',
  // },
  // domain: {
  //   frontend: process.env.DOMAIN_FRONTEND || 'http://localhost:3002',
  // },
});

export const envConfig: ConfigModuleOptions = {
  isGlobal: true,
  load: [configuration],
  envFilePath: '.env',
};