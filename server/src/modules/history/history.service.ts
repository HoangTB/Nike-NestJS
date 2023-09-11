import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, LessThanOrEqual, Repository } from 'typeorm';
import { History } from './database/history.entity';
import { HistoryDTO, HistoryGetMonthDTO } from './dto/history.dto';
import { EmailMailer } from '../../utils/mailer';
@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History)
    private HistoryRepo: Repository<History>,
    private EmailMailer: EmailMailer,
  ) {}
  async postHistory(data: HistoryDTO): Promise<{ message: string }> {
    try {
      const history = this.HistoryRepo.create(data);
      await this.HistoryRepo.save(history);

      await this.EmailMailer.sendRegistrationEmail(history);
      return { message: 'Create Successfully' };
    } catch (err) {
      return { message: err.message };
    }
  }

  async searchHistoryType(query: {
    orderID: string;
    status: string;
  }): Promise<HistoryDTO[] | { message: string }> {
    try {
      let queryBuilder = this.HistoryRepo.createQueryBuilder('History')
        .leftJoinAndSelect('History.Product', 'Product')
        .leftJoinAndSelect('History.Order', 'Order');

      if (query.orderID === 'All' && query.status === 'All') {
        queryBuilder = queryBuilder;
      } else {
        if (query.orderID !== 'All') {
          queryBuilder = queryBuilder.where('History.order_id = :order_id', {
            order_id: query.orderID,
          });
        }

        if (query.status !== 'All') {
          if (query.status === 'Pending') {
            queryBuilder = queryBuilder.andWhere('History.status = :status', {
              status: 1,
            });
          } else if (query.status === 'Processing') {
            queryBuilder = queryBuilder.andWhere('History.status = :status', {
              status: 2,
            });
          } else if (query.status === 'Out for Delivered') {
            queryBuilder = queryBuilder.andWhere('History.status = :status', {
              status: 3,
            });
          } else if (query.status === 'Delivered') {
            queryBuilder = queryBuilder.andWhere('History.status = :status', {
              status: 4,
            });
          }
        }
      }

      const history = await queryBuilder.getMany();
      return history;
    } catch (err) {
      return { message: err.message };
    }
  }

  async getAllHistoryByIdOrder(): Promise<HistoryDTO[] | { message: string }> {
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
  ): Promise<HistoryDTO[] | { message: string }> {
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
  async getRevenue(): Promise<History[] | { message: string }> {
    try {
      const history = this.HistoryRepo.find({
        where: {
          status: 4,
        },
        relations: ['Product'],
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
