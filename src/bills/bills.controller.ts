import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';

import { BillsService } from '@/bills/bills.service';
import { CreateBillDto, CreateIconDto, GetMonthBillsDto } from '@/bills/dto';
import { GetIconTypeDto } from '@/bills/dto/get-icon-type.dto';
import { Roles } from '@/decorator/roles.decorator';
import { UserRole } from '@/enum/user-role.enum';
import { UserId } from '@/decorator/extract-jwt-user-id.decorator';

@Controller('bills')
export class BillsController {
  constructor(private readonly billsService: BillsService) {}

  // 创建账单
  @Post()
  createBill(@Body() createBillDto: CreateBillDto) {
    return this.billsService.createBill(createBillDto);
  }

  // 删除账单;
  @Delete(':id')
  deleteBill(@Param('id') id: string, @UserId() userId: string) {
    return this.billsService.deleteBill(id, userId);
  }

  //创建分类图标(购物,工资...) *普通用户
  @Post('icon')
  addIcon(@Body() createIconDto: CreateIconDto) {
    return this.billsService.createIcon(createIconDto);
  }

  //创建全局分类图标(购物,工资...) *管理员-->用来创建默认图标
  @Post('admin-icon')
  @Roles(UserRole.ADMIN)
  addAdminIcon(@Body() createIconDto: CreateIconDto) {
    return this.billsService.createIcon(createIconDto, true);
  }

  // 获取分类图标(购物,工资...)
  @Get('icon')
  getIconTypes(
    @Query() getIconTypeDto: GetIconTypeDto,
    @UserId() userId: string,
  ) {
    return this.billsService.getIconTypes(getIconTypeDto, userId);
  }

  //删除自定义的图标
  @Delete('icon/:id')
  deleteIcon(@Param('id') id: string, @UserId() userId: string) {
    return this.billsService.deleteIcon(id, userId);
  }

  //获取当月账单
  @Get('month')
  getMonthBills(
    @Query() getMonthBillsDto: GetMonthBillsDto,
    @UserId() user_id: string,
  ) {
    return this.billsService.getMonthBills(getMonthBillsDto, user_id);
  }
}
