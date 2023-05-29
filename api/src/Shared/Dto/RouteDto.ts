import { NextFunction, Response } from 'express'

import { HttpMethodEnum } from '../Enums/HttpMethodEnum'
import { CoreRequest } from '../Models/Request/CoreRequest'

export class RouteDto {
  constructor(
    private readonly path: string,
    private readonly method: HttpMethodEnum,
    private readonly handle: (request: CoreRequest, response: Response, next: NextFunction) => void
  ) {}

  public getPath() {
    return this.path
  }

  public getMethod() {
    return this.method
  }

  public getHandle() {
    return this.handle
  }
}
