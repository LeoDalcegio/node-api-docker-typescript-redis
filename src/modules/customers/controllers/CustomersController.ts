import { Request, Response } from 'express';
import { CreateCustomerDto } from '../dto/CreateCustomerDto';
import { UpdateCustomerDto } from '../dto/UpdateCustomerDto';
import CreateCustomerService from '../services/CreateCustomerService';
import DeleteCustomerService from '../services/DeleteCustomerService';
import ListCustomersService from '../services/ListCustomersService';
import ShowCustomerService from '../services/ShowCustomerService';
import UpdateCustomerService from '../services/UpdateCustomerService';

export default class ProductsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCustomersService = new ListCustomersService();

    const customers = await listCustomersService.execute();

    return response.json(customers);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showCustomerService = new ShowCustomerService();

    const customer = await showCustomerService.execute(id);

    return response.json(customer);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;

    const createCustomerDto: CreateCustomerDto = {
      name,
      email,
    };

    const createCustomerService = new CreateCustomerService();

    const customer = await createCustomerService.execute(createCustomerDto);

    return response.json(customer);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const { id } = request.params;

    const updateCustomerDto: UpdateCustomerDto = {
      name,
      email,
    };

    const updateCustomerService = new UpdateCustomerService();

    const customer = await updateCustomerService.execute(id, updateCustomerDto);

    return response.json(customer);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCustomerService = new DeleteCustomerService();

    await deleteCustomerService.execute(id);

    return response.json([]);
  }
}
