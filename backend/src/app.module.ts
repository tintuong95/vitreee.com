import { Module, ValidationPipe } from '@nestjs/common';
import { FamilyTreeModule } from './modules/family-tree.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FamilyTree } from './entities/family-tree';
import { Account } from './entities/account';
import { AccountModule } from './modules/account.module';
import { MemberModule } from './modules/member.module';
import { RelationModule } from './modules/relation.module';
import { Relation } from './entities/relation';
import { Member } from './entities/member';
import { AuthModule } from './modules/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { envConfig } from './config/configuration';
import { APP_PIPE } from '@nestjs/core';
import { database } from './config/database';
@Module({

  imports: [
    /**
     * import configuration
     */
    ConfigModule.forRoot(envConfig),
    /**
     * import typeorm
     */
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => database(configService),
      inject: [ConfigService],
    }),
    /**
     * import modules
     */
    AuthModule, FamilyTreeModule, AccountModule, MemberModule, RelationModule],
  providers: [
    /**
   * import validator pipeline
   */
    {
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({
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
export class AppModule { }
