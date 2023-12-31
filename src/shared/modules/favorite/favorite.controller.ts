import { PrivateRouteMiddleware } from '../../libs/rest/index.js';
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
    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.index,
      middlewares: [new PrivateRouteMiddleware()],
    });
    this.addRoute({
      path: '/:offerId/:status',
      method: HttpMethod.Post,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
      ],
    });
  }

  public async index(req: Request, res: Response): Promise<void> {
    const userId = req.tokenPayload.id;
    const offers = await this.favoriteService.getFavorites(userId);

    this.ok(res, fillDTO(OffersRdo, offers));
  }

  public async update(req: Request, res: Response): Promise<void> {
    const { offerId, status } = req.params;
    const userId = req.tokenPayload.id;

    const offer = await this.favoriteService.setFavoriteById(
      offerId,
      status,
      userId
    );

    if (status === '1') {
      this.created(res, fillDTO(OfferRdo, offer));
    } else {
      this.ok(res, fillDTO(OfferRdo, offer));
    }
  }
}
