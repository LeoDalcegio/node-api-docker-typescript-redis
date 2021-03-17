import AppError from '@shared/errors/AppError';
import { ORDER_NOT_FOUND } from '@shared/errors/Errors';
import { getCustomRepository } from 'typeorm';
import Order from '../typeorm/entities/Order';
import OrdersRepository from '../typeorm/repositories/OrderRepository';

class ShowOrderService {
  public async execute(id: string): Promise<Order> {
    const orderRepository = getCustomRepository(OrdersRepository);

    const order = await orderRepository.findById(id);

    if (!order) {
      throw new AppError(ORDER_NOT_FOUND);
    }

    return order;
  }
}

export default ShowOrderService;
