import Customer from '@modules/customers/typeorm/entities/Customer';

export class CreateOrderDto {
  customer?: Customer;
  customerId: string;
  products: IProduct[];
}

interface IProduct {
  id: string;
  quantity: number;
  price?: number;
}
