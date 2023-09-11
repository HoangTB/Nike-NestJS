import {
  Controller,
  Get,
  Patch,
  Post,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryDTO, HistoryGetMonthDTO } from './dto/history.dto';

@Controller('/api/v1/history')
export class HistoryController {
  constructor(private readonly HistoryService: HistoryService) {}
  @Post()
  postHistory(@Body() data: HistoryDTO) {
    return this.HistoryService.postHistory(data);
  }

  @Get('/search')
  searchHistoryType(@Query() query: any) {
    return this.HistoryService.searchHistoryType(query);
  }

  @Get('/get-orderID')
  getAllHistoryByIdOrder() {
    return this.HistoryService.getAllHistoryByIdOrder();
  }
  @Get('/get-orderID/:id')
  getHistoryByIdOrder(@Param('id') id: number) {
    return this.HistoryService.getHistoryByIdOrder(id);
  }
  @Get('/get-revenue')
  getRevenue() {
    return this.HistoryService.getRevenue();
  }
  @Post('/get-month')
  getHistoryWithMonth(@Body() data: HistoryGetMonthDTO) {
    return this.HistoryService.getHistoryWithMonth(data);
  }

  @Patch('/update/:id')
  updateHistoryStatus(@Body() data: HistoryDTO, @Param('id') id: number) {
    return this.HistoryService.updateHistoryStatus(data, id);
  }
}
