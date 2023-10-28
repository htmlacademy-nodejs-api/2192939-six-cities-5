import { CreateReviewDto } from './index.js';
import { inject, injectable } from 'inversify';
import {
  BaseController,
  DocumentExistsMiddleware,
  HttpMethod,
  PrivateRouteMiddleware,
  ValidateDtoMiddleware,
} from '../../libs/rest/index.js';
import { Component } from '../../types/component.enum.js';
import { ReviewService } from './index.js';
import { OfferService } from '../offer/index.js';
import { Logger } from '../../libs/logger/index.js';
import { CreateReviewRequest } from './index.js';
import { Response } from 'express';
import { fillDTO } from '../../helpers/common.js';
import { ReviewRdo } from './rdo/review.rdo.js';

@injectable()
export default class ReviewController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.ReviewService)
    private readonly reviewService: ReviewService,
    @inject(Component.OfferService) private readonly offerService: OfferService
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController...');
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateReviewDto),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });
  }

  public async create(
    { body, tokenPayload }: CreateReviewRequest,
    res: Response
  ): Promise<void> {
    const review = await this.reviewService.create({
      ...body,
      userId: tokenPayload.id,
    });
    this.created(res, fillDTO(ReviewRdo, review));
  }
}
