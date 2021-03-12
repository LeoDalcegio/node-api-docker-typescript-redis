import User from "../typeorm/entities/User";

export default interface ISignUpResponse {
  user: User,
  token: string
}
