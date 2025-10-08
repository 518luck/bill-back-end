import { Module } from '@nestjs/common';
import { BillsController } from '@/bills/bills.controller';
import { BillsService } from '@/bills/bills.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Bill } from '@/bills/entity/bill.entity';
import { Category } from '@/bills/entity/category.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Bill, Category]), ConfigModule],
  controllers: [BillsController],
  providers: [BillsService],
})
export class BillsModule {}
