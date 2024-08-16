class ApiError extends Error {
  public readonly status: number;
  public readonly isOperational: boolean;

  constructor(
    status: number,
    message: string,
    isOperational = true,
    stack?: string,
  ) {
    super(message);
    this.status = status;
    this.isOperational = isOperational;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
