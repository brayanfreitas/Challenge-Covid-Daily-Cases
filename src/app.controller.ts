import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Something Wrong (Internal Error)'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Welcome Message Returned'
  })
  @Get()
  getChcallengeMessage(): string {
    return this.appService.getChallengeMessage();
  }
}
