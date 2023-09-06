import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { History } from './database/history.entity';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';
import { EmailMailer } from '../../utils/mailer';

@Module({
  imports: [TypeOrmModule.forFeature([History])],
  controllers: [HistoryController],
  providers: [HistoryService, EmailMailer],
})
export class HistoryModule {}
