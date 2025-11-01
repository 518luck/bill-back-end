import { IsOptional, Min, IsNumber } from 'class-validator';

export class UpdateAssetDebtPieDto {
  //选择当月还是全部负债进行核算
  @IsOptional()
  monthly_only?: boolean;

  //是否让账单参与核算
  @IsOptional()
  include_bills?: boolean;

  //余额资产
  @IsOptional()
  @IsNumber()
  @Min(0)
  balance?: number;
}
