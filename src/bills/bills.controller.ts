import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { BillsService } from '@/bills/bills.service';
import { CreateBillDto, CreateIconDto } from '@/bills/dto';
import { GetIconTypeDto } from '@/bills/dto/get-icon-type.dto';
import { CurrentUserId } from '@/decorator/current-user-id.decorator';
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
  addIcon(
    @Body() createCategoryDto: CreateIconDto,
    @CurrentUserId() userId: string,
  ) {
    return this.billsService.createIcon(createCategoryDto, userId);
  }

  //创建全局分类图标(购物,工资...) *管理员-->用来创建默认图标
  @Post('admin-icon')
  @Roles(UserRole.ADMIN)
  addAdminIcon(@Body() createIconDto: CreateIconDto) {
    const userId = '0';
    return this.billsService.createIcon(createIconDto, userId);
  }

  // 获取分类图标(购物,工资...)
  @Get('icon')
  getIconTypes(
    @Query() getIconTypeDto: GetIconTypeDto,
    @CurrentUserId() userId: string,
  ) {
    return this.billsService.getIconTypes(getIconTypeDto, userId);
  }
}
