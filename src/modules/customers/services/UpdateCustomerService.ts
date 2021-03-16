import AppError from '@shared/errors/AppError';
import { CUSTOMER_NOT_FOUND, USER_EMAIL_CONFLICT } from '@shared/errors/Errors';
import { getCustomRepository } from 'typeorm';
import { UpdateCustomerDto } from '../dto/UpdateCustomerDto';
import Customer from '../typeorm/entities/Customer';
import CustomerRepository from '../typeorm/repositories/CustomerRepository';

class UpdateCustomerService {
  public async execute(
    id: string,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomerRepository);

    const customer = await customerRepository.findOne(id);

    if (!customer) {
      throw new AppError(CUSTOMER_NOT_FOUND);
    }

    const customerUpdateEmail = await customerRepository.findByEmail(
      updateCustomerDto.email,
    );

    if (
      customerUpdateEmail &&
      updateCustomerDto.email !== customerUpdateEmail.email
    ) {
      throw new AppError(USER_EMAIL_CONFLICT);
    }

    customer.name = updateCustomerDto.name;
    customer.email = updateCustomerDto.email;

    await customerRepository.save(customer);

    return customer;
  }
}

export default UpdateCustomerService;
