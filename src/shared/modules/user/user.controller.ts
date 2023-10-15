import { inject, injectable } from 'inversify';
import { BaseController, HttpMethod } from '../../libs/rest/index.js';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Response } from 'express';
import { CreateUserRequest } from './index.js';

@injectable()
export class UserController extends BaseController {
  constructor(@inject(Component.Logger) protected readonly logger: Logger) {
    super(logger);
    this.logger.info('Register routes for UserController...');

    this.addRoute({
      path: '/register',
      method: HttpMethod.Post,
      handler: this.create,
    });
  }

  public async create(_req: CreateUserRequest, _res: Response): Promise<void> {
    throw new Error('[UseController] Oops');
  }
}
