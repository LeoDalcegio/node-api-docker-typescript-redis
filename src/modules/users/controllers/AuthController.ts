import { Request, Response } from "express";
import { SignUpDto } from "../dto/SignUpDto";
import SignInService from "../services/SignInService";
import ISignInResponse from '../interfaces/ISignInResponse';

export default class AuthController {
  public async signUp(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const signUpDto: SignUpDto = {
      email, password
    }

    const signIn = new SignInService();

    const signInResponse: ISignInResponse = await signIn.execute(signUpDto);

    return response.json(signInResponse);
  }
}
