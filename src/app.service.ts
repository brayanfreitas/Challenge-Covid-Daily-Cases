import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cases } from './modules/cases/cases.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Cases) private readonly casesRepository: Repository<Cases>
  ) {}

  getChallengeMessage(): string {
    const challengeMessage = 'Backend Challenge 2021 🏅 - Covid Daily Cases';
    return challengeMessage;
  }

  async getAllAvailableDates() {
    const dates = await this.casesRepository
      .createQueryBuilder()
      .select('date::varchar')
      .distinct(true)
      .orderBy('date')
      .getRawMany();

    const datesObject = dates.map((values) => {
      return values.date;
    });
    return datesObject;
  }
}
