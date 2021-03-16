import AppError from '@shared/errors/AppError';
import { INVALID_CREDENTIALS } from '@shared/errors/Errors';
import { getCustomRepository } from 'typeorm';
import ISignInResponse from '../interfaces/ISignInResponse';
import { SignInDto } from '../dto/SignInDto';
import UserRepository from '../typeorm/repositories/UserRepository';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import IJwtPayload from '../interfaces/IJwtPayload';
import { SIGNIN_ACCESS_TOKEN } from '@shared/constants/tokens';

class SignInService {
  public async execute(signInDto: SignInDto): Promise<ISignInResponse> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findByEmail(signInDto.email);

    if (!user) {
      throw new AppError(INVALID_CREDENTIALS, 401);
    }

    const hash = await bcrypt.hash(signInDto.password, user.salt);

    if (user.password !== hash) {
      throw new AppError(INVALID_CREDENTIALS, 401);
    }

    const payload: IJwtPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    const token = jwt.sign(payload, String(process.env.JWT_SECRET), {
      subject: SIGNIN_ACCESS_TOKEN,
      expiresIn: '7d',
    });

    const signInResponse: ISignInResponse = {
      token,
      user,
    };

    return signInResponse;
  }
}

export default SignInService;
