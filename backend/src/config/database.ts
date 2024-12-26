import {TypeOrmModuleOptions} from '@nestjs/typeorm';
import {ConfigService} from '@nestjs/config';
import * as fs from 'fs-extra';

export const database = (
	configService: ConfigService
): TypeOrmModuleOptions => ({
	autoLoadEntities: true,
	type: configService.get<any>('database.type'),
	host: configService.get<string>('database.host'),
	port: configService.get<number>('database.port'),
	username: configService.get<string>('database.username'),
	password: configService.get<string>('database.password'),
	database: configService.get<string>('database.name'),
	migrations: ['src/database/migration/*{.ts,.js}'],
	//  cli: {
	//  	migrationsDir: 'src/database/migration',
	// },
	ssl: {
		minVersion: 'TLSv1.2',
		ca: fs.readFileSync(`./isrgrootx1.pem`),
	},
	synchronize: false,
	migrationsRun: false,
	dropSchema: false,
	logging: true,
});
