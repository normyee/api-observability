export class InvalidDomainParamError extends Error {
  public readonly param: string;

  constructor(param: string) {
    super(`Invalid param: ${param}`);
    this.param = param;

    this.name = 'InvalidParamError';

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidDomainParamError);
    }
  }
}
