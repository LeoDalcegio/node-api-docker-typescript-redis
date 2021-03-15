import User from "../typeorm/entities/User";

export default interface ISignInResponse {
  user: User,
  token: string
}
