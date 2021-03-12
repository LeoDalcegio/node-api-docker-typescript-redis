import { Request, Response } from "express";
import { CreateUserDto } from "../dto/CreateUserDto";
import CreateUserService from "../services/CreateUserService";
import ListUsersService from "../services/ListUsersService";


export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUsers = new ListUsersService();

    const Users = await listUsers.execute();

    return response.json(Users);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUserDto: CreateUserDto = {
      name, email, password
    }

    const createUser = new CreateUserService();

    const user = await createUser.execute(createUserDto);

    return response.json(user);
  }
}
