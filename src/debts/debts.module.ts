import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Debt } from '@/debts/entity/debt.entity';
import { Repayment } from '@/debts/entity/repayment.entity';
import { DebtsController } from '@/debts/debts.controller';
import { DebtsService } from '@/debts/debts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Debt, Repayment])],
  controllers: [DebtsController],
  providers: [DebtsService],
  exports: [DebtsService],
})
export class DebtsModule {}
