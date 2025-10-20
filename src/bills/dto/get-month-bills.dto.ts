import { IsNotEmpty, IsISO8601, IsOptional, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetMonthBillsDto {
  @IsNotEmpty({ message: '日期不能为空' })
  @IsISO8601({}, { message: '日期格式错误，应为 YYYY-MM-DD' })
  date_str: string;

  @IsOptional()
  @Transform(({ value }) => parseInt(value as string, 10))
  @IsNumber({}, { message: ' payday 必须是一个数字' })
  payday?: number;
}
