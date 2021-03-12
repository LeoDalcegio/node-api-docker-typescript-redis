import { Request, Response } from "express";
import { SignUpDto } from "../dto/SignUpDto";
import SignUpService from "../services/SignUpService";
import ISignUpResponse from '../interfaces/ISignUpResponse';

export default class AuthController {
  public async signUp(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const signUpDto: SignUpDto = {
      email, password
    }

    const signUp = new SignUpService();

    const signUpResponse: ISignUpResponse = await signUp.execute(signUpDto);

    return response.json(signUpResponse);
  }
}
