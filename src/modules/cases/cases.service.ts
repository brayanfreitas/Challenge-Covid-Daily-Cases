import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cases } from './cases.entity';
import { GetSplitByVariantAndsLocationRequestDto } from './dto/request/GetSplitByVariantAndsLocationRequestDto';
import { GetSplitByVariantAndsLocationReponseDto } from './dto/response/GetSplitByVariantAndsLocationReponseDto';

@Injectable()
export class CasesService {
  constructor(
    @InjectRepository(Cases)
    private readonly casesRepository: Repository<Cases>
  ) {}

  async getSplitByCountryAndVarianByDate(
    request: GetSplitByVariantAndsLocationRequestDto
  ): Promise<GetSplitByVariantAndsLocationReponseDto[]> {
    const { date } = request;
    const cases = await this.casesRepository.find({ where: { date } });

    const variantSplit = this.groupByPropriety(cases, 'variant');

    variantSplit.forEach((variant) => {
      const resultGroupedByLocation = this.groupByPropriety(
        variant.variantCasesData,
        'location'
      );
      variant.variantCasesData = Object.keys(resultGroupedByLocation).map(
        (key) => {
          return { data: resultGroupedByLocation[key] };
        }
      ) as [];
    });

    return variantSplit as GetSplitByVariantAndsLocationReponseDto[];
  }

  private groupByPropriety(cases: Cases[], attribute: string) {
    const groupedByProps = cases.reduce((group, cases: Cases) => {
      const key = attribute === 'variant' ? cases.variant : cases.location;
      (group[key] = group[key] ?? []).push(cases);
      return group;
    }, {});

    return Object.keys(groupedByProps).map((key) => {
      return { [attribute]: key, variantCasesData: groupedByProps[key] };
    });
  }
}
