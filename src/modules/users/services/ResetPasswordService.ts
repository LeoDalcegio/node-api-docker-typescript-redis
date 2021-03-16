import AppError from '@shared/errors/AppError';
import { USER_NOT_FOUND, TOKEN_EXPIRED } from '@shared/errors/Errors';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UserRepository';
import { isAfter, addHours } from 'date-fns';
import * as bcrypt from 'bcrypt';
import UserTokenRepository from '../typeorm/repositories/UserTokenRepository';
import { ResetPasswordDto } from '../dto/ResetPasswordDto';

class ResetPasswordService {
  public async execute(resetPasswordDto: ResetPasswordDto): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);
    const userTokensRepository = getCustomRepository(UserTokenRepository);

    const userToken = await userTokensRepository.findByToken(
      resetPasswordDto.token,
    );

    if (!userToken) {
      throw new AppError(USER_NOT_FOUND);
    }

    const user = await userRepository.findOne(userToken.user_id);

    if (!user) {
      throw new AppError(USER_NOT_FOUND);
    }

    const compareDate = addHours(userToken.created_at, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError(TOKEN_EXPIRED);
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(resetPasswordDto.password, salt);

    user.password = hashedPassword;
    user.salt = salt;

    await userRepository.save(user);
  }
}

export default ResetPasswordService;
