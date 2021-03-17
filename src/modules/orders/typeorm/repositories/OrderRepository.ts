import { EntityRepository, Repository } from 'typeorm';
import Order from '../entities/Order';
import { CreateOrderDto } from '@modules/orders/dto/CreateOrderDto';

@EntityRepository(Order)
class OrdersRepository extends Repository<Order> {
  public async findById(id: string): Promise<Order | undefined> {
    const order = this.findOne(id, {
      relations: ['order_products', 'customer'],
    });

    return order;
  }

  public async createOrder({
    customer,
    products,
  }: CreateOrderDto): Promise<Order> {
    const order = this.create({
      customer,
      orderProducts: products,
    });

    await this.save(order);

    return order;
  }
}

export default OrdersRepository;
