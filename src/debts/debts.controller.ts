import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { DebtsService } from '@/debts/debts.service';
import { CreateDebtDto, CreateRepaymentDto } from '@/debts/dto';
import { UserId } from '@/decorator/extract-jwt-user-id.decorator';

@Controller('debts')
export class DebtsController {
  constructor(private readonly debtsService: DebtsService) {}

  // 创建债务
  @Post()
  createDebt(
    @Body() createRepaymentDto: CreateDebtDto,
    @UserId() userId: string,
  ) {
    return this.debtsService.createDebt(createRepaymentDto, userId);
  }

  // 获取用户所有债务
  @Get()
  getDebts(@UserId() userId: string) {
    return this.debtsService.getDebts(userId);
  }

  // 偿还债务
  @Post('repay')
  repayDebt(
    @Body() repayDebtDto: CreateRepaymentDto,
    @UserId() userId: string,
  ) {
    return this.debtsService.repayDebt(repayDebtDto, userId);
  }

  // 删除债务
  @Delete(':id')
  deleteDebt(@Param('id') id: string, @UserId() userId: string) {
    return this.debtsService.deleteDebt(id, userId);
  }

  //获取还款记录
  @Get('repayments/:id')
  getRepayments(@Param('id') id: string) {
    return this.debtsService.getRepayments(id);
  }
}
