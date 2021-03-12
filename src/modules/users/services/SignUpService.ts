import AppError from "@shared/errors/AppError";
import { INVALID_CREDENTIALS } from "@shared/errors/Errors";
import { getCustomRepository } from "typeorm";
import ISignUpResponse from "../interfaces/ISignUpResponse";
import { SignUpDto } from "../dto/SignUpDto";
import UserRepository from "../typeorm/repositories/UserRepository";
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import IJwtPayload from "../interfaces/IJwtPayload";
import { SIGNIN_ACCESS_TOKEN } from "@shared/constants/tokens";

class SignUpService {
  public async execute(signUpDto: SignUpDto): Promise<ISignUpResponse> {
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
      email: user.email,
      name: user.name
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      subject: SIGNIN_ACCESS_TOKEN,
      expiresIn: '7d'
    });

    return user;
  }
}

export default SignUpService;
