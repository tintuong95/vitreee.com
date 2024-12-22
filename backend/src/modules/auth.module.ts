import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from 'src/controllers/auth.controller';
import { AccountModule } from './account.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategyProvider } from 'src/auth/jwt-strategy.provider';
import { ConfigService } from '@nestjs/config';


@Module({
  imports: [PassportModule,
    AccountModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('jwt.secret_key'),
          signOptions: {
            expiresIn: configService.get<number>('jwt.expiration_time'),
          },
        };
      },
      inject: [ConfigService],
    }),],

  controllers: [AuthController],
  providers: [JwtStrategyProvider],
})
export class AuthModule { }