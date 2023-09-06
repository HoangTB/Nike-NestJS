export class ImageDTO {
  id?: number;
  image_1?: string;
  image_2?: string;
  image_3?: string;
  image_4?: string;
  product_id?: number;
}

export class FilesImageDTO {
  fieldname?: string;
  originalname?: string;
  encoding?: string;
  mimetype?: string;
  path?: string;
  size?: number;
  filename?: string;
}
