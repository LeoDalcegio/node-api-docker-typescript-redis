import Customer from '@modules/customers/typeorm/entities/Customer';

export class CreateOrderDto {
  customer_id: string;
  products: IProduct[];
}

interface IProduct {
  id: string;
  quantity: number;
}
