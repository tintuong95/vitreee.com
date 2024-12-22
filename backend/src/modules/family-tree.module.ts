import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FamilyTreeController } from 'src/controllers/family-tree.controller';
import { FamilyTree } from 'src/entities/family-tree';
import { FamilyTreeProvider } from 'src/providers/family-tree.provider';


@Module({
  imports: [TypeOrmModule.forFeature([FamilyTree])],

  controllers: [FamilyTreeController],
  providers: [FamilyTreeProvider],
})
export class FamilyTreeModule { }