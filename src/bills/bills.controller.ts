import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { BillsService } from '@/bills/bills.service';
import { CreateBillDto, CreateCategoryDto } from '@/bills/dto';
import { GetCategoryTypeDto } from './dto/get-category-type.dto';
import { CurrentUserId } from '@/decorator/current-user-id.decorator';

@Controller('bills')
export class BillsController {
  constructor(private readonly billsService: BillsService) {}

  // 创建账单
  @Post()
  createBill(@Body() createBillDto: CreateBillDto) {
    return this.billsService.createBill(createBillDto);
  }

  //创建分类图标(购物,工资...)
  @Post('categories')
  addCategoryType(
    @Body() createCategoryDto: CreateCategoryDto,
    @CurrentUserId() userId: string,
  ) {
    return this.billsService.createCategory(createCategoryDto, userId);
  }
  // 获取分类图标(购物,工资...)
  @Get('categories')
  getCategoryTypes(
    @Query() getCategoryTypeDto: GetCategoryTypeDto,
    @CurrentUserId() userId: string,
  ) {
    return this.billsService.getCategoryTypes(getCategoryTypeDto, userId);
  }
}
