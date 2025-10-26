import { IsOptional, IsString, IsNumber, Min } from 'class-validator';

export class UpdateDebtDto {
  //债务名称
  @IsOptional()
  @IsString()
  creditor?: string;

  //债务金额
  @IsOptional()
  @IsNumber()
  @Min(0)
  total_amount?: number;

  //已还金额
  @IsOptional()
  @IsNumber()
  @Min(0)
  repaid_amount?: number;

  //当前月需还金额
  @IsOptional()
  @IsNumber()
  @Min(0)
  current_month_due?: number;
}
