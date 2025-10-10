import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Bill } from '@/bills/entity/bill.entity';
import { Category } from '@/bills/entity/category.entity';
import { CreateBillDto, CreateCategoryDto } from '@/bills/dto';

@Injectable()
export class BillsService {
  constructor(
    @InjectRepository(Bill)
    private readonly billsRepository: Repository<Bill>,
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  // 获取消费类型
  getCategoryTypes() {}

  // 创建账单
  createBill(createBillDto: CreateBillDto) {
    const bill = this.billsRepository.create(createBillDto);
    return this.billsRepository.save(bill);
  }

  // 创建分类(餐饮,交通,住宿,其他....)
  async createCategory(createCategoryDto: CreateCategoryDto) {
    const category = this.categoriesRepository.create({
      ...createCategoryDto,
      userId: createCategoryDto.userId ?? 0, //不传递就是默认系统分类
    });

    const exists = await this.categoriesRepository.findOne({
      where: {
        name: category.name,
        userId: category.userId,
        type: category.type,
      },
    });
    if (exists) {
      throw new HttpException('分类已存在', HttpStatus.BAD_REQUEST);
    }
    return this.categoriesRepository.save(category);
  }
}
