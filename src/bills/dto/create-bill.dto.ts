import { IconType } from '@/enum/icon-type.enum';
import {
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateBillDto {
  @IsNumber({}, { message: '金额必须是数字' })
  @Min(0.01, { message: '金额必须大于0' })
  money: number;

  @IsString({ message: '备注必须是字符串' })
  note: string;

  @IsEnum(IconType, { message: '分类类型必须是 income 或 expense' })
  type: IconType;

  @IsNotEmpty({ message: '分类名称不能为空' })
  @IsString({ message: '分类名称必须是字符串' })
  icon_name: string;

  // TODO:后面如果用户没有传递就添加一个默认值
  @IsOptional()
  @IsISO8601({}, { message: '日期格式错误，应为 YYYY-MM-DD' })
  date?: string;

  @IsOptional()
  @IsString({ message: '用户ID必须是字符串' })
  user_id?: string;
}
