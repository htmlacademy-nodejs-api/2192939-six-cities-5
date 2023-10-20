import { inject, injectable } from 'inversify';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/index.js';
import { Request, Response } from 'express';
import { OfferRdo, OffersRdo, OfferService, UpdateOfferDto } from './index.js';
import { fillDTO } from '../../helpers/common.js';
import {
  BaseController,
  HttpError,
  HttpMethod,
} from '../../libs/rest/index.js';
import { StatusCodes } from 'http-status-codes';
import { ParamOfferId } from './types/param-offerid.type.js';
import { CreateOfferRequest } from './types/create-offer-request.type.js';
import { ReviewService } from '../review/review-service.interface.js';
import { ReviewRdo } from '../review/index.js';
import { ParamCityName } from './types/param-cityname.type.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService)
    private readonly offerService: OfferService,
    @inject(Component.ReviewService)
    private readonly reviewService: ReviewService
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController...');

    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
    });
    this.addRoute({
      path: '/:offerId/reviews',
      method: HttpMethod.Get,
      handler: this.getReviews,
    });
    this.addRoute({
      path: '/:cityName/premium',
      method: HttpMethod.Get,
      handler: this.getPremium,
    });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();
    this.ok(res, fillDTO(OffersRdo, offers));
  }

  public async create(
    { body }: CreateOfferRequest,
    res: Response
  ): Promise<void> {
    const result = await this.offerService.create(body);
    const offer = await this.offerService.findById(result.id);
    this.created(res, fillDTO(OfferRdo, offer));
  }

  public async show(
    { params }: Request<ParamOfferId>,
    res: Response
  ): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.findById(offerId);

    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_IMPLEMENTED,
        'Not implement',
        'OfferController'
      );
    }

    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async delete(
    { params }: Request<ParamOfferId>,
    res: Response
  ): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.deleteById(offerId);

    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${offerId} not found`,
        'OfferController'
      );
    }

    await this.reviewService.deleteByOfferId(offerId);

    this.noContent(res, offer);
  }

  public async update(
    { body, params }: Request<ParamOfferId, unknown, UpdateOfferDto>,
    res: Response
  ): Promise<void> {
    const updateOffer = await this.offerService.updateById(
      params.offerId,
      body
    );

    if (!updateOffer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${params.offerId} not found.`,
        'OfferController'
      );
    }

    this.ok(res, fillDTO(OfferRdo, updateOffer));
  }

  public async getReviews(
    { params }: Request<ParamOfferId>,
    res: Response
  ): Promise<void> {
    if (!(await this.offerService.exists(params.offerId))) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${params.offerId} not found.`,
        'OfferController'
      );
    }

    const reviews = await this.reviewService.findByOfferId(params.offerId);
    this.ok(res, fillDTO(ReviewRdo, reviews));
  }

  public async getPremium(
    { params }: Request<ParamCityName>,
    res: Response
  ): Promise<void> {
    const premium = await this.offerService.getPremium(params.cityName);
    this.ok(res, fillDTO(OffersRdo, premium));
  }
}
