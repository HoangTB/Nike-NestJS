import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { History } from './database/history.entity';
import { HistoryDTO, HistoryGetMonthDTO } from './dto/history.dto';
@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History)
    private HistoryRepo: Repository<History>,
  ) {}
  async postHistory(data: HistoryDTO): Promise<{ message: string }> {
    try {
      const history = this.HistoryRepo.create(data);
      await this.HistoryRepo.save(history);
      return { message: 'Create Successfully' };
    } catch (err) {
      return { message: err.message };
    }
  }
  async getAllHistoryByIdOrder(): Promise<History[] | { message: string }> {
    try {
      const history = this.HistoryRepo.find({
        relations: ['Order', 'Product'],
      });
      return history;
    } catch (err) {
      return { message: err.message };
    }
  }
  async getHistoryByIdOrder(
    id: number,
  ): Promise<History[] | { message: string }> {
    try {
      const history = this.HistoryRepo.find({
        where: { order_id: id },
        relations: ['Product'],
      });
      return history;
    } catch (err) {
      return { message: err.message };
    }
  }
  async getHistoryWithMonth(
    data: HistoryGetMonthDTO,
  ): Promise<History[] | { message: string }> {
    try {
      const year = data.dataYear;
      const month = data.dataMonth;
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);

      const history = this.HistoryRepo.find({
        where: {
          status: 4,
          order_date: Between(startDate, endDate),
        },
        relations: ['Order', 'Product'],
      });
      return history;
    } catch (err) {
      return { message: err.message };
    }
  }
  async updateHistoryStatus(
    data: HistoryDTO,
    id: number,
  ): Promise<History[] | { message: string }> {
    try {
      const historyFind = await this.HistoryRepo.findOneBy({ id });
      if (historyFind) {
        await this.HistoryRepo.update(id, data);
        return { message: 'Update Successfully' };
      }
    } catch (err) {
      return { message: err.message };
    }
  }
}
