import { Request, Response } from 'express';
import { ForgotPasswordDto } from '../dto/ForgotPasswordDto';
import CreateUserService from '../services/CreateUserService';
import ListUsersService from '../services/ListUsersService';
import SendForgotPasswordEmailService from '../services/SendForgotPasswordEmailService';

export default class ForgotPasswordController {
  public async createToken(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { email } = request.body;

    const forgotPasswordDto: ForgotPasswordDto = {
      email,
    };

    const sendForgotPasswordEmailService = new SendForgotPasswordEmailService();

    await sendForgotPasswordEmailService.execute(forgotPasswordDto);

    return response.status(204).json();
  }
}
