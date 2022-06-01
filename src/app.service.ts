import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getChallengeMessage(): string {
    const challengeMessage = 'Backend Challenge 2021 🏅 - Covid Daily Cases';
    return challengeMessage;
  }

  getHello(): string {
    return 'Hello World!';
  }
}
