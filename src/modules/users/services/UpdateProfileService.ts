import AppError from '@shared/errors/AppError';
import {
  USER_EMAIL_CONFLICT,
  USER_NOT_FOUND,
  OLD_PASSWORD_REQUIRED,
  OLD_PASSWORD_DOES_NOT_MATCH,
} from '@shared/errors/Errors';
import * as bcrypt from 'bcrypt';
import { getCustomRepository } from 'typeorm';
import { UpdateUserDto } from '../dto/UpdateUserDto';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UserRepository';

class UpdateProfileService {
  public async execute(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne(userId);

    if (!user) {
      throw new AppError(USER_NOT_FOUND);
    }

    const userUpdateEmail = await userRepository.findByEmail(
      updateUserDto.email,
    );

    if (userUpdateEmail && userUpdateEmail.id !== userId) {
      throw new AppError(USER_EMAIL_CONFLICT);
    }

    if (updateUserDto.password && !updateUserDto.oldPassword) {
      throw new AppError(OLD_PASSWORD_REQUIRED);
    }

    if (updateUserDto.password && updateUserDto.oldPassword) {
      const hashedOldPassword = await bcrypt.hash(
        updateUserDto.oldPassword,
        user.salt,
      );

      if (user.password !== hashedOldPassword) {
        throw new AppError(OLD_PASSWORD_DOES_NOT_MATCH);
      }

      const salt = await bcrypt.genSalt(10);

      const hashedPassword = await bcrypt.hash(updateUserDto.password, salt);

      user.password = hashedPassword;
      user.salt = salt;
    }

    user.name = updateUserDto.name;
    user.email = updateUserDto.email;

    await userRepository.save(user);

    return user;
  }
}

export default UpdateProfileService;
