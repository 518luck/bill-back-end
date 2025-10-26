import { Body, Controller, Post } from '@nestjs/common';
import { DebtsService } from '@/debts/debts.service';
import { CreateDebtDto } from '@/debts/dto/create-dabt.dto';
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
}
