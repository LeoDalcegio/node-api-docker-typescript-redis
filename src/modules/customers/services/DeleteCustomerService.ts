import AppError from '@shared/errors/AppError';
import { CUSTOMER_NOT_FOUND } from '@shared/errors/Errors';
import { getCustomRepository } from 'typeorm';
import CustomerRepository from '../typeorm/repositories/CustomerRepository';

class DeleteCustomerService {
  public async execute(id: string): Promise<void> {
    const customerRepository = getCustomRepository(CustomerRepository);

    const customer = await customerRepository.findOne(id);

    if (!customer) {
      throw new AppError(CUSTOMER_NOT_FOUND);
    }

    await customerRepository.remove(customer);
  }
}

export default DeleteCustomerService;
