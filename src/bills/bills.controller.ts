import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { BillsService } from '@/bills/bills.service';
import { CreateBillDto, CreateIconDto } from '@/bills/dto';
import { GetIconTypeDto } from '@/bills/dto/get-icon-type.dto';
import { Roles } from '@/decorator/roles.decorator';
import { UserRole } from '@/enum/user-role.enum';

@Controller('bills')
export class BillsController {
  constructor(private readonly billsService: BillsService) {}

  // 创建账单
  @Post()
  createBill(@Body() createBillDto: CreateBillDto) {
    return this.billsService.createBill(createBillDto);
  }

  //创建分类图标(购物,工资...) *普通用户
  @Post('icon')
  addIcon(@Body() createCategoryDto: CreateIconDto) {
    return this.billsService.createIcon(createCategoryDto);
  }

  //创建全局分类图标(购物,工资...) *管理员-->用来创建默认图标
  @Post('admin-icon')
  @Roles(UserRole.ADMIN)
  addAdminIcon(@Body() createIconDto: CreateIconDto) {
    return this.billsService.createIcon(createIconDto);
  }

  // 获取分类图标(购物,工资...)
  @Get('icon')
  getIconTypes(@Query() getIconTypeDto: GetIconTypeDto) {
    return this.billsService.getIconTypes(getIconTypeDto);
  }
}
