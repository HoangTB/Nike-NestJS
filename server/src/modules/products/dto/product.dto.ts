import { ImageDTO } from '../../images/dto/image.dto';

export class ProductDTO {
  id?: number;
  name?: string;
  type?: string;
  image?: string;
  price?: number;
  new?: number;
  quantity_inventory?: number;
  status?: number;
  Image?: ImageDTO;
}
