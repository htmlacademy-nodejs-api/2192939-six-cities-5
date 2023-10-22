import { inject, injectable } from 'inversify';
import {
  BaseController,
  HttpMethod,
  ValidateObjectIdMiddleware,
} from '../../libs/rest/index.js';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { FavoriteService } from './index.js';
import { Request, Response } from 'express';
import { fillDTO } from '../../helpers/index.js';
import { OfferRdo, OffersRdo } from '../offer/index.js';

@injectable()
export class FavoriteController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.FavoriteService)
    private readonly favoriteService: FavoriteService
  ) {
    super(logger);

    this.logger.info('Register routes for FavoriteController');
    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({
      path: '/:offerId/:status',
      method: HttpMethod.Post,
      handler: this.update,
      middlewares: [new ValidateObjectIdMiddleware('offerId')],
    });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.favoriteService.getFavorites();

    this.ok(res, fillDTO(OffersRdo, offers));
  }

  public async update(req: Request, res: Response): Promise<void> {
    const { offerId, status } = req.params;
    const offer = await this.favoriteService.setFavoriteById(offerId, status);

    this.ok(res, fillDTO(OfferRdo, offer));
  }
}
