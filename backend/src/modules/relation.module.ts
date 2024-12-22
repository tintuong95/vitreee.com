import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RelationController } from 'src/controllers/relation.controller';
import { Relation } from 'src/entities/relation';
import { RelationProvider } from 'src/providers/relation.provider';


@Module({
  imports: [TypeOrmModule.forFeature([Relation])],

  controllers: [RelationController],
  providers: [RelationProvider],
})
export class RelationModule { }