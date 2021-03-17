import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomerRepository from '../typeorm/repositories/CustomerRepository';
import IPaginate from '@shared/interfaces/IPaginate';

class ListCustomersService {
  public async execute(): Promise<IPaginate<Customer>> {
    const customerRepository = getCustomRepository(CustomerRepository);

    const customers = await customerRepository.createQueryBuilder().paginate();

    return customers as IPaginate<Customer>;
  }
}

export default ListCustomersService;
