import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Bill } from '@/bills/entity/bill.entity';
import { CreateBillDto } from '@/bills/dto/create-bill.dto';

@Injectable()
export class BillsService {
  constructor(
    @InjectRepository(Bill)
    private readonly billsRepository: Repository<Bill>,
  ) {}

  // 创建账单
  createBill(createBillDto: CreateBillDto) {
    const bill = this.billsRepository.create(createBillDto);
    return this.billsRepository.save(bill);
  }
}
