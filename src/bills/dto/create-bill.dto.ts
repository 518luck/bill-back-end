import { IconType } from '@/enum/icon-type.enum';
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
  iconId: number;

  @IsString({ message: '分类类型必须是字符串' })
  type: IconType;

  @IsOptional()
  @IsString({ message: '备注必须是字符串' })
  note?: string;

  @IsOptional()
  @IsISO8601({}, { message: '日期格式错误，应为 YYYY-MM-DD' })
  date?: string;
}
