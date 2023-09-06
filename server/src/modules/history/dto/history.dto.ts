export class HistoryDTO {
  id?: number;
  quantity?: number;
  size_product?: string;
  fullName?: string;
  email?: string;
  address?: string;
  phone?: string;
  status?: number;
  order_date?: Date;
  order_id?: number;
  product_id?: number;
}

export class HistoryGetMonthDTO {
  dataMonth?: number;
  dataYear?: number;
}
