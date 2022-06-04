import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { AppService } from '../app.service';
import { Cases } from '../modules/cases/cases.entity';
import {
  MockType,
  repositoryMockFactory,
  selectQueryBuilderMock
} from '../modules/common/mock';

describe('AppService', () => {
  let service: AppService;
  let repository: MockType<Repository<Cases>>;
  let selectQueryBuilder: SelectQueryBuilder<any>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: getRepositoryToken(Cases),
          useFactory: repositoryMockFactory
        }
      ]
    }).compile();

    selectQueryBuilder = selectQueryBuilderMock();
    service = module.get<AppService>(AppService);
    repository = module.get(getRepositoryToken(Cases));

    jest
      .spyOn(repository, 'createQueryBuilder')
      .mockReturnValue(selectQueryBuilder);
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
  });

  describe('getChallengeMessage', () => {
    it('should return the challenge message', () => {
      expect(service.getChallengeMessage()).toEqual(
        'Backend Challenge 2021 🏅 - Covid Daily Cases'
      );
    });
  });

  describe('getAllDates', () => {
    it('should return all dates', async () => {
      jest
        .spyOn(selectQueryBuilder, 'getRawMany')
        .mockResolvedValue([
          { date: '2020-05-11' },
          { date: '2020-05-25' },
          { date: '2020-06-08' },
          { date: '2020-06-22' },
          { date: '2020-07-06' }
        ]);

      const response = await service.getAllAvailableDates();
      expect(selectQueryBuilder.select).toHaveBeenCalledTimes(1);
      expect(selectQueryBuilder.distinct).toHaveBeenCalledTimes(1);
      expect(selectQueryBuilder.cache).toHaveBeenCalledTimes(1);
      expect(selectQueryBuilder.getRawMany).toHaveBeenCalledTimes(1);
      expect(response).toBeDefined();
      expect(response.length).toEqual(5);
      expect(response).toMatchObject([
        '2020-05-11',
        '2020-05-25',
        '2020-06-08',
        '2020-06-22',
        '2020-07-06'
      ]);
    });
  });
});
