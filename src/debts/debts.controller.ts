import { Controller } from '@nestjs/common';
import { DebtsService } from '@/debts/debts.service';

@Controller('debts')
export class DebtsController {
  constructor(private readonly debtsService: DebtsService) {}
}
