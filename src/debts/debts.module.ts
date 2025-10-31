import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Debt } from '@/debts/entity/debt.entity';
import { Repayment } from '@/debts/entity/repayment.entity';
import { DebtsController } from '@/debts/debts.controller';
import { DebtsService } from '@/debts/debts.service';
import { User } from '@/users/entity/user.entity';
import { Asset } from '@/debts/entity/asset.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Debt, Repayment, User, Asset])],
  controllers: [DebtsController],
  providers: [DebtsService],
  exports: [DebtsService],
})
export class DebtsModule {}
