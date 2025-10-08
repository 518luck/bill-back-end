import { Body, Controller, Post } from '@nestjs/common';

import { BillsService } from '@/bills/bills.service';
import { CreateBillDto, CreateCategoryDto } from '@/bills/dto';

@Controller('bills')
export class BillsController {
  constructor(private readonly billsService: BillsService) {}

  // 创建账单
  @Post()
  createBill(@Body() createBillDto: CreateBillDto) {
    return this.billsService.createBill(createBillDto);
  }

  //添加类型
  @Post('categories/default')
  addCategoryType(@Body() createCategoryDto: CreateCategoryDto) {
    return this.billsService.createCategory(createCategoryDto);
  }
}
