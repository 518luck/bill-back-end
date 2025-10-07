import { Body, Controller, Post } from '@nestjs/common';

import { BillsService } from '@/bills/bills.service';
import { CreateBillDto } from '@/bills/dto/create-bill.dto';

@Controller('bills')
export class BillsController {
  constructor(private readonly billsService: BillsService) {}

  @Post()
  createBill(@Body() createBillDto: CreateBillDto) {
    console.log(
      '🚀 ~ BillsController ~ createBill ~ createBillDto:',
      createBillDto,
    );
    return this.billsService.createBill(createBillDto);
  }
}
