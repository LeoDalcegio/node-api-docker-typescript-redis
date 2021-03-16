import AppError from '@shared/errors/AppError';
import { USER_NOT_FOUND } from '@shared/errors/Errors';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UserRepository';

class ShowProfileService {
  public async execute(id: string): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne(id);

    if (!user) {
      throw new AppError(USER_NOT_FOUND);
    }

    return user;
  }
}

export default ShowProfileService;
