import { IsNotEmpty } from 'class-validator';

export class FavoriteDTO {
  id?: number;
  user_id?: number;
  product_id?: number;
}
