import {
  IsISO8601,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateBillDto {
  @IsNumber({}, { message: '金额必须是数字' })
  @Min(0.01, { message: '金额必须大于0' })
  money: number;

  @IsNumber({}, { message: '分类ID必须是数字' })
  categoryId: number;

  @IsOptional()
  @IsString({ message: '备注必须是字符串' })
  note?: string;

  @IsOptional()
  @IsISO8601(
    {},
    {
      message:
        '账单日期必须是有效的 ISO 8601 日期字符串，例如 2025-10-07T12:00:00Z',
    },
  )
  date?: string; // <-- 映射到数据库的 date 字段
}
