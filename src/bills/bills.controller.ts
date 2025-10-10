import { Body, Controller, Get, Post } from '@nestjs/common';

import { BillsService } from '@/bills/bills.service';
import { CreateBillDto, CreateCategoryDto } from '@/bills/dto';

@Controller('bills')
export class BillsController {
  constructor(private readonly billsService: BillsService) {}

  // 获取消费类型
  @Get('categories')
  getCategoryTypes() {
    return this.billsService.getCategoryTypes();
  }

  // 创建账单
  @Post()
  createBill(@Body() createBillDto: CreateBillDto) {
    return this.billsService.createBill(createBillDto);
  }

  //添加类型
  @Post('categories')
  addCategoryType(@Body() createCategoryDto: CreateCategoryDto) {
    return this.billsService.createCategory(createCategoryDto);
  }
}
