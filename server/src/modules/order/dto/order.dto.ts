import { IsNotEmpty } from 'class-validator';

export class OrderDTO {
  id?: number;
  status?: number;
  order_date?: Date;
  user_id?: number;
}
