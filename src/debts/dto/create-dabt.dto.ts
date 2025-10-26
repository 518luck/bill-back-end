import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateDebtDto {
  //欠款方
  @IsString()
  @IsNotEmpty({ message: '欠款方不能为空' })
  creditor: string;

  // 欠款总额度
  @IsNumber({}, { message: '欠款金额必须是一个数字' })
  @IsDefined({ message: '欠款金额不能为空' })
  @Min(0, { message: '欠款金额必须大于等于0' })
  @Max(99999999.99, { message: '欠款金额不能超过 99,999,999.99' })
  total_amount: number;

  //累计已还金额
  @IsNumber({}, { message: '已还金额必须是一个数字' })
  @IsDefined({ message: '已还金额不能为空' })
  @Min(0, { message: '已还金额必须大于等于0' })
  @Max(99999999.99, { message: '已还金额不能超过 99,999,999.99' })
  repaid_amount: number;

  //本月应还金额
  @IsNumber({}, { message: '本月应还金额必须是一个数字' })
  @IsDefined({ message: '本月应还金额不能为空' })
  @Min(0, { message: '本月应还金额必须大于等于0' })
  @Max(99999999.99, { message: '本月应还金额不能超过 99,999,999.99' })
  current_month_due: number;

  // 欠款开始日期
  @IsNotEmpty({ message: '欠款开始日期不能为空' })
  start_date: Date;

  //预计还清日期
  @IsNotEmpty({ message: '预计还清日期不能为空' })
  end_date: Date;
}
