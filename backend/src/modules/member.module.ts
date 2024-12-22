import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberController } from 'src/controllers/member.controller';
import { Member } from 'src/entities/member';
import { MemberProvider } from 'src/providers/member.provider';


@Module({
  imports: [TypeOrmModule.forFeature([Member])],

  controllers: [MemberController],
  providers: [MemberProvider],
})
export class MemberModule { }