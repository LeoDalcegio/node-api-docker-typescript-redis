import AppError from "@shared/errors/AppError";
import { INVALID_CREDENTIALS } from "@shared/errors/Errors";
import { getCustomRepository } from "typeorm";
import ISignInResponse from "../interfaces/ISignInResponse";
import { SignUpDto } from "../dto/SignUpDto";
import UserRepository from "../typeorm/repositories/UserRepository";
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import IJwtPayload from "../interfaces/IJwtPayload";
import { SIGNIN_ACCESS_TOKEN } from "@shared/constants/tokens";

class SignInService {
  public async execute(signUpDto: SignUpDto): Promise<ISignInResponse> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findByEmail(signUpDto.email);

    if (!user) {
      throw new AppError(INVALID_CREDENTIALS, 401);
    }

    const hash = await bcrypt.hash(signUpDto.password, user.salt);

    const passwordConfirmed = await bcrypt.compare(signUpDto.password, hash);

    if (!passwordConfirmed) {
      throw new AppError(INVALID_CREDENTIALS, 401);
    }

    const payload: IJwtPayload = {
      id: user.id,
      email: user.email,
      name: user.name
    }

    const token = jwt.sign(payload, String(process.env.JWT_SECRET), {
      subject: SIGNIN_ACCESS_TOKEN,
      expiresIn: '7d'
    });

    const signInResponse: ISignInResponse = {
      token,
      user
    }

    return signInResponse;
  }
}

export default SignInService;
