import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { Controller } from './controller.interface.js';
import { Response, Router } from 'express';
import { Logger } from '../../logger/index.js';
import { Route } from '../index.js';
import asyncHandler from 'express-async-handler';
import { Component } from '../../../types/component.enum.js';
import { PathTransformer } from '../transform/path.transformer.js';

const DEFAULT_CONTENT_TYPE = 'application/json';
/**
 * Класс абстрактный, поэтому экземпляры не могут создаваться напрямую
 * Декоратор должен использоваться даже для абстрактного класса
 */
@injectable()
export abstract class BaseController implements Controller {
  /**
   * Приватное поле, через которое будет происходить взаимодействие с Router
   */
  private readonly _router: Router;

  @inject(Component.PathTransformer) private pathTransformer: PathTransformer;

  /**
   *
   * @param logger экземпляр логгера. В абстрактном классе внедрять его нет смысла.
   * Поэтому будет передаваться из наследников. Им смогут воспользоваться потомки.
   */
  constructor(protected readonly logger: Logger) {
    this._router = Router();
  }

  get router() {
    return this._router;
  }

  public addRoute(route: Route): void {
    const wrapperAsyncHandler = asyncHandler(route.handler.bind(this));
    const middlewareHandlers = route.middlewares?.map((item) =>
      asyncHandler(item.execute.bind(item))
    );
    const allHandlers = middlewareHandlers
      ? [...middlewareHandlers, wrapperAsyncHandler]
      : wrapperAsyncHandler;

    this._router[route.method](route.path, allHandlers);
    this.logger.info(
      `Route registered: ${route.method.toUpperCase()} ${route.path}`
    );
  }

  public send<T>(res: Response, statusCode: number, data: T): void {
    const modifiedData = this.pathTransformer.execute(
      data as Record<string, unknown>
    );
    res.type(DEFAULT_CONTENT_TYPE).status(statusCode).json(modifiedData);
  }

  public created<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.CREATED, data);
  }

  public noContent<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.NO_CONTENT, data);
  }

  public ok<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.OK, data);
  }
}
