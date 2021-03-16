import AppError from '@shared/errors/AppError';
import { CUSTOMER_NOT_FOUND } from '@shared/errors/Errors';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomerRepository from '../typeorm/repositories/CustomerRepository';

class ShowCustomerService {
  public async execute(id: string): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomerRepository);

    const customer = await customerRepository.findOne(id);

    if (!customer) {
      throw new AppError(CUSTOMER_NOT_FOUND);
    }

    return customer;
  }
}

export default ShowCustomerService;
