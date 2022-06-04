import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import {
  MockType,
  repositoryMockFactory,
  selectQueryBuilderMock
} from '../../common/mock';
import { Cases } from '../cases.entity';
import { CasesService } from '../cases.service';
import { getCumulative, getSplitMock } from './mock/casesMock';
describe('Cases Module', () => {
  let casesService: CasesService;
  let selectQueryBuilder: SelectQueryBuilder<any>;
  let casesRepository: MockType<Repository<Cases>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CasesService,
        {
          provide: getRepositoryToken(Cases),
          useFactory: repositoryMockFactory
        }
      ]
    }).compile();

    casesService = module.get<CasesService>(CasesService);
    selectQueryBuilder = selectQueryBuilderMock();
    casesRepository = module.get(getRepositoryToken(Cases));

    jest
      .spyOn(casesRepository, 'createQueryBuilder')
      .mockReturnValue(selectQueryBuilder);
  });

  it('should be defined', async () => {
    expect(casesService).toBeDefined();
  });

  describe('getSplitByCountryAndVarianByDate', () => {
    it('List all registers by date, splitted by variant and location', async () => {
      casesRepository.find.mockReturnValue(getSplitMock);
      const reponse = await casesService.getSplitByCountryAndVarianByDate({
        date: '2020-07-06'
      });
      expect(reponse).toBeDefined();
      expect(reponse).toHaveLength(3);
      expect(casesRepository.find).toBeCalled();
    });
  });

  describe('getByCountryAndVarianByDateCumulative', () => {
    it('Count number of register until the specify date, splitted by variant and location', async () => {
      jest
        .spyOn(selectQueryBuilder, 'getRawMany')
        .mockResolvedValue(getCumulative);

      const reponse = await casesService.getByCountryAndVarianByDateCumulative({
        date: '2020-07-06'
      });
      expect(casesRepository.createQueryBuilder).toBeCalled();
      expect(selectQueryBuilder.select).toHaveBeenCalledTimes(1);
      expect(selectQueryBuilder.addSelect).toHaveBeenCalledTimes(2);
      expect(selectQueryBuilder.where).toHaveBeenCalledTimes(1);
      expect(selectQueryBuilder.groupBy).toHaveBeenCalledTimes(1);
      expect(selectQueryBuilder.addGroupBy).toHaveBeenCalledTimes(1);
      expect(selectQueryBuilder.getRawMany).toHaveBeenCalledTimes(1);
      expect(reponse).toBeDefined();
      expect(reponse).toHaveLength(4);
    });
  });
});
