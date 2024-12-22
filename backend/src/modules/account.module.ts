import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountController } from 'src/controllers/account.controller';
import { Account } from 'src/entities/account';
import { AccountProvider } from 'src/providers/account.provider';


@Module({
  imports: [TypeOrmModule.forFeature([Account])],

  controllers: [AccountController],
  providers: [AccountProvider],
  exports: [AccountProvider]
})
export class AccountModule { }