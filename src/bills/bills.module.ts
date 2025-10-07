import { Module } from '@nestjs/common';
import { BillsController } from '@/bills/bills.controller';
import { BillsService } from '@/bills/bills.service';

@Module({
  imports: [],
  controllers: [BillsController],
  providers: [BillsService],
})
export class BillsModule {}
