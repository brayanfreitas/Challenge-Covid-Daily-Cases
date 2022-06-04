import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CasesService } from './cases.service';
import { GetSplitByVariantAndsLocationRequestDto } from './dto/request/GetSplitByVariantAndsLocationRequestDto';
import { GetSplitByVariantAndsLocationReponseDto } from './dto/response/GetSplitByVariantAndsLocationReponseDto';

@Controller('cases')
export class CasesController {
  constructor(private readonly casesService: CasesService) {}

  @Get(':date/count')
  @ApiOperation({
    summary: 'List all registers by date, splitted by variant and location'
  })
  @ApiParam({ name: 'date', description: 'Date to list variant and location' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'All register fetched successfully',
    type: GetSplitByVariantAndsLocationReponseDto,
    isArray: true
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Wrong date format'
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Something unexpected unexpected'
  })
  async getCountryAndVariantByDate(
    @Param() request: GetSplitByVariantAndsLocationRequestDto
  ) {
    return this.casesService.getSplitByCountryAndVarianByDate(request);
  }

  @Get(':date/cumulative')
  @ApiOperation({
    summary:
      'Count number of register until the specify date, splitted by variant and location'
  })
  @ApiParam({ name: 'date', description: 'Date to get registers' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'All register fetched successfully',
    type: GetSplitByVariantAndsLocationReponseDto,
    isArray: true
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Wrong date format'
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Something unexpected unexpected'
  })
  async getByCountryAndVarianByDateAccumulative(
    @Param() request: GetSplitByVariantAndsLocationRequestDto
  ) {
    return this.casesService.getByCountryAndVarianByDateCumulative(request);
  }
}
