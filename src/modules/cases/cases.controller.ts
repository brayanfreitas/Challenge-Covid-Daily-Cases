import { Controller, Get } from '@nestjs/common';
import { CasesService } from './cases.service';

@Controller('cases')
export class CasesController {
  constructor(private readonly casesService: CasesService) {}

  @Get('count')
  getChcallengeMessage() {
    return this.casesService.getCountryAndVariantByDate('2020-07-06');
  }
}
