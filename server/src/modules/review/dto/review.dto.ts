import { IsNotEmpty } from 'class-validator';

export class ReviewDTO {
  id?: number;
  content?: string;
  star?: number;
  createdAt?: Date;
  product_id?: number;
  user_id?: number;
}
