import { IsOptional, IsString, IsNumber, Min } from 'class-validator';

export class UpdateDebtDto {
  @IsOptional()
  @IsString()
  creditor?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  total_amount?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  repaid_amount?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  current_month_due?: number;
}
