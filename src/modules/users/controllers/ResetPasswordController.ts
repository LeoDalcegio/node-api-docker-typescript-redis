import { Request, Response } from 'express';
import { ResetPasswordDto } from '../dto/ResetPasswordDto';
import ResetPasswordService from '../services/ResetPasswordService';

export default class ResetPasswordController {
  public async resetPassword(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { token, password } = request.body;

    const resetPasswordDto: ResetPasswordDto = {
      token,
      password,
    };

    const resetPasswordService = new ResetPasswordService();

    await resetPasswordService.execute(resetPasswordDto);

    return response.status(204).json();
  }
}
