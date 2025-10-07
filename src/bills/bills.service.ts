import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Bill } from './entity/bill.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BillsService {
  constructor(
    @InjectRepository(Bill)
    private readonly billsRepository: Repository<Bill>,
  ) {}

  // 创建账单
  createBill() {
    return 'This action adds a new bill';
  }
}
