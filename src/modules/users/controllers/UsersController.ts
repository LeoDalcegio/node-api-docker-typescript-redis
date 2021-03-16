import { Request, Response } from 'express';
import { CreateUserDto } from '../dto/CreateUserDto';
import CreateUserService from '../services/CreateUserService';
import ListUsersService from '../services/ListUsersService';

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUsersService = new ListUsersService();

    const user = await listUsersService.execute();

    return response.json(user);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUserDto: CreateUserDto = {
      name,
      email,
      password,
    };

    const createUserService = new CreateUserService();

    const user = await createUserService.execute(createUserDto);

    return response.json(user);
  }
}
