import { inject, injectable } from 'inversify';
import { BaseController, HttpMethod } from '../../../rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/index.js';
import { Request, Response } from 'express';
import { OfferRdo, OfferService } from './index.js';
import { fillDTO } from '../../helpers/common.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService)
    protected readonly offerService: OfferService
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController...');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.read });
    // this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
  }

  public async read(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();
    const responseData = fillDTO(OfferRdo, offers);
    this.ok(res, responseData);
  }

  // public async create(_req: Request, res: Response): Promise<void> {}
}
