import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateRepaymentDto {
  // 债务id
  @IsNotEmpty({ message: '不能空输入债务id' })
  @IsString()
  debt_id: string;

  // 还款金额
  @IsNumber({}, { message: '欠款金额必须是一个数字' })
  @IsDefined({ message: '欠款金额不能为空' })
  @Min(0, { message: '欠款金额必须大于等于0' })
  @Max(99999999.99, { message: '欠款金额不能超过 99,999,999.99' })
  @IsNumber()
  amount: number;

  // 还款日期
  @IsString({ message: '还款日期必须是一个字符串' })
  @IsNotEmpty({ message: '不能空输入还款日期' })
  date: Date;
}
