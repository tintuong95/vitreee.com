import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
export declare const database: (configService: ConfigService) => TypeOrmModuleOptions;
