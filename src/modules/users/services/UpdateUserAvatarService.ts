import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import { USER_NOT_FOUND } from '@shared/errors/Errors';
import fs from 'fs';
import path from 'path';
import { getCustomRepository } from 'typeorm';
import { UpdateUserAvatar } from '../dto/UpdateUserAvatar';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UserRepository';

class UpdateUserAvatarService {
  public async execute(
    userId: string,
    updateUserAvatar: UpdateUserAvatar,
  ): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne(userId);

    if (!user) {
      throw new AppError(USER_NOT_FOUND);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = updateUserAvatar.avatarFilename;

    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
