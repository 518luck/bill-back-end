import { Module } from '@nestjs/common';
import { BillsController } from '@/bills/bills.controller';
import { BillsService } from '@/bills/bills.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Bill } from '@/bills/entity/bill.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bill])],
  controllers: [BillsController],
  providers: [BillsService],
})
export class BillsModule {}
