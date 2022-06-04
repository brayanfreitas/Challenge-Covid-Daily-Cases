import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cases } from './cases.entity';
import { GetSplitByVariantAndsLocationRequestDto } from './dto/request/GetSplitByVariantAndsLocationRequestDto';
import {
  GetSplitByVariantAndsLocationReponseDto,
  LocationData
} from './dto/response/GetSplitByVariantAndsLocationReponseDto';

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
    const cases = await this.casesRepository.find({
      where: { date },
      cache: true
    });

    const variantSplit = this.groupByPropriety(cases, 'variant');

    const locationSplit = this.groupByLocation(variantSplit);

    return locationSplit;
  }

  async getByCountryAndVarianByDateCumulative(
    request: GetSplitByVariantAndsLocationRequestDto
  ) {
    const { date } = request;

    const cases = await this.casesRepository
      .createQueryBuilder('cases')
      .select('variant')
      .addSelect('location')
      .addSelect('SUM(num_sequences) as total')
      .where('date <= :date', { date })
      .groupBy('location')
      .addGroupBy('variant')
      .cache(true)
      .getRawMany();

    const casesSplittedByVariant = this.groupByPropriety(cases, 'variant');

    const casesSplittedByLocation = this.groupByLocation(
      casesSplittedByVariant
    );

    return casesSplittedByLocation as GetSplitByVariantAndsLocationReponseDto[];
  }

  private groupByPropriety(cases: Cases[], attribute: string) {
    const groupedByProps = cases.reduce((group, cases: Cases) => {
      const key = attribute === 'variant' ? cases.variant : cases.location;
      /* istanbul ignore next */
      (group[key] = group[key] ?? []).push(cases);
      return group;
    }, {});

    return Object.keys(groupedByProps).map((key) => {
      return { [attribute]: key, variantCasesData: groupedByProps[key] };
    });
  }

  private groupByLocation(variantSplit) {
    variantSplit.forEach((variant) => {
      const resultGroupedByLocation = this.groupByPropriety(
        variant.variantCasesData,
        'location'
      );
      variant.variantCasesData = Object.keys(resultGroupedByLocation).map(
        (key) => {
          return { data: resultGroupedByLocation[key] };
        }
      );
    }) as LocationData[];

    return variantSplit as GetSplitByVariantAndsLocationReponseDto[];
  }
}
