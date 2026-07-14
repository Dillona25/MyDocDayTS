// Simple error class we can use for expected errors

export class AppError extends Error {
  statusCode: number;
  code: string;
  field?: string;

  constructor(
    message: string,
    statusCode: number,
    code: string,
    field?: string,
  ) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.code = code;
    this.field = field;
  }
}
