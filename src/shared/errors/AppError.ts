class AppError {
  constructor(
    public readonly message: string,
    public readonly statusCode = 400,
  ) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default AppError;
