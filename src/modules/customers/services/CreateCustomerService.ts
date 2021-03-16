import AppError from '@shared/errors/AppError';
import { USER_EMAIL_CONFLICT } from '@shared/errors/Errors';
import { getCustomRepository } from 'typeorm';
import { CreateCustomerDto } from '../dto/CreateCustomerDto';
import Customer from '../typeorm/entities/Customer';
import CustomerRepository from '../typeorm/repositories/CustomerRepository';

class CreateCustomerService {
  public async execute(
    createCustomerDto: CreateCustomerDto,
  ): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomerRepository);

    const emailExists = await customerRepository.findByEmail(
      createCustomerDto.email,
    );

    if (emailExists) {
      throw new AppError(USER_EMAIL_CONFLICT);
    }

    const customer = customerRepository.create({
      name: createCustomerDto.name,
      email: createCustomerDto.email,
    });

    await customerRepository.save(customer);

    return customer;
  }
}

export default CreateCustomerService;
