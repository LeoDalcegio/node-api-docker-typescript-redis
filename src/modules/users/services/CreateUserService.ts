import AppError from "@shared/errors/AppError";
import { USER_EMAIL_CONFLICT } from "@shared/errors/Errors";
import { getCustomRepository } from "typeorm";
import { CreateUserDto } from "../dto/CreateUserDto";
import User from "../typeorm/entities/User";
import UserRepository from "../typeorm/repositories/UserRepository";
import * as bcrypt from 'bcrypt';

class CreateUserService {
  public async execute(createUserDto: CreateUserDto): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);

    const emailExists = await userRepository.findByEmail(createUserDto.email);

    if (emailExists) {
      throw new AppError(USER_EMAIL_CONFLICT);
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const user = userRepository.create({
      name: createUserDto.name,
      email: createUserDto.email,
      password: hashedPassword,
      salt
    });

    await userRepository.save(user);

    return user
  }
}

export default CreateUserService;
