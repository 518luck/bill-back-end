import {
  IsDateString,
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
  @IsDateString(
    {},
    { message: '日期必须是有效的 ISO 日期字符串，例如 2025-10-07' },
  )
  date?: string;
}
