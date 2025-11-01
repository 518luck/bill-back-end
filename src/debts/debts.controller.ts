import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DebtsService } from '@/debts/debts.service';
import { CreateDebtDto, CreateRepaymentDto, UpdateDebtDto } from '@/debts/dto';
import { UserId } from '@/decorator/extract-jwt-user-id.decorator';
import { UpdateAssetDebtPieDto } from '@/debts/dto/update-asset-debt-pie.dto';

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

  // 修改债务饼图数据
  @Patch('asset-debt-pie')
  updateAssetDebtPie(
    @UserId() userId: string,
    @Body() updateAssetDebtPieDto: UpdateAssetDebtPieDto,
  ) {
    return this.debtsService.updateAssetDebtPie(userId, updateAssetDebtPieDto);
  }

  // 修改债务
  @Patch(':id')
  updateDebt(@Param('id') id: string, @Body() updateDebtDto: UpdateDebtDto) {
    return this.debtsService.updateDebt(id, updateDebtDto);
  }

  // 资产债务饼图数据
  @Get('asset-debt-pie')
  getAssetDebtPie(@UserId() userId: string) {
    return this.debtsService.getAssetDebtPie(userId);
  }

  // 获取资产债务配置信息
  @Get('asset-debt-pie/config')
  getAssetDebtPieConfig(@UserId() userId: string) {
    return this.debtsService.getAssetDebtPieConfig(userId);
  }
}
