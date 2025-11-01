import { Module } from '@nestjs/common';
import { BillsController } from '@/bills/bills.controller';
import { BillsService } from '@/bills/bills.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Bill } from '@/bills/entity/bill.entity';
import { Icon } from '@/bills/entity/icon';
import { ConfigModule } from '@nestjs/config';
import { User } from '@/users/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bill, Icon, User]), ConfigModule],
  controllers: [BillsController],
  providers: [BillsService],
  exports: [BillsService],
})
export class BillsModule {}
