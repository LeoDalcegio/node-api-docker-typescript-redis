import { Request, Response } from 'express';
import { CreateOrderDto } from '../dto/CreateOrderDto';
import CreateOrderService from '../services/CreateOrderService';
import ShowOrderService from '../services/ShowOrderService';

export default class OrdersController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showOrderService = new ShowOrderService();

    const order = await showOrderService.execute(id);

    return response.json(order);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { customer_id, products } = request.body;

    const createOrderDto: CreateOrderDto = {
      customer_id,
      products,
    };

    const createOrderService = new CreateOrderService();

    const order = await createOrderService.execute(createOrderDto);

    return response.json(order);
  }
}
