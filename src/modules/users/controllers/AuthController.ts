import { Request, Response } from 'express';
import { SignInDto } from '../dto/SignInDto';
import SignInService from '../services/SignInService';
import ISignInResponse from '../interfaces/ISignInResponse';

export default class AuthController {
  public async signIn(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const signInDto: SignInDto = {
      email,
      password,
    };

    const signInService = new SignInService();

    const signInResponse: ISignInResponse = await signInService.execute(
      signInDto,
    );

    return response.json(signInResponse);
  }
}
