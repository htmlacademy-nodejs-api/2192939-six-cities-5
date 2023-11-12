import { inject, injectable } from 'inversify';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/index.js';
import { Request, Response } from 'express';
import {
  OfferRdo,
  OffersRdo,
  OfferService,
  UpdateOfferDto,
  CreateOfferDto,
  UploadImageRdo,
} from './index.js';
import { fillDTO } from '../../helpers/common.js';
import {
  BaseController,
  DocumentExistsMiddleware,
  HttpError,
  HttpMethod,
  PrivateRouteMiddleware,
  UploadFileMiddleware,
  ValidateDtoMiddleware,
  ValidateObjectIdMiddleware,
} from '../../libs/rest/index.js';
import { ParamOfferId } from './types/param-offerid.type.js';
import { CreateOfferRequest } from './types/create-offer-request.type.js';
import { ReviewService } from '../review/review-service.interface.js';
import { ReviewRdo } from '../review/index.js';
import { ParamCityName } from './types/param-cityname.type.js';
import { Config } from '../../libs/config/config.interface.js';
import { RestSchema } from '../../libs/config/rest.schema.js';
import { UploadFilesMiddleware } from '../../libs/rest/middleware/upload-files.middleware.js';
import { UploadImagesRdo } from './rdo/upload-images.rdo.js';
import { StatusCodes } from 'http-status-codes';
import { ImagesPathTransformer } from '../../libs/rest/transform/images-path.transformer.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService)
    private readonly offerService: OfferService,
    @inject(Component.ReviewService)
    private readonly reviewService: ReviewService,
    @inject(Component.Config)
    private readonly configService: Config<RestSchema>,
    @inject(Component.ImagesPathTransformer)
    private readonly imagePathTransformer: ImagesPathTransformer
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController...');

    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateOfferDto),
      ],
    });
    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });
    this.addRoute({
      path: '/:offerId/reviews',
      method: HttpMethod.Get,
      handler: this.getReviews,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });
    this.addRoute({
      path: '/:cityName/premium',
      method: HttpMethod.Get,
      handler: this.getPremium,
    });
    this.addRoute({
      path: '/:offerId/imagePreview',
      method: HttpMethod.Post,
      handler: this.uploadImage,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new UploadFileMiddleware(
          this.configService.get('UPLOAD_DIRECTORY'),
          'image'
        ),
      ],
    });
    this.addRoute({
      path: '/:offerId/images',
      method: HttpMethod.Post,
      handler: this.uploadImages,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new UploadFilesMiddleware(
          this.configService.get('UPLOAD_DIRECTORY'),
          'images'
        ),
      ],
    });
  }

  public async index(req: Request, res: Response): Promise<void> {
    const userId = req.tokenPayload?.id;

    const offers = await this.offerService.find(userId);

    this.ok(res, fillDTO(OffersRdo, offers));
  }

  public async create(
    { body, tokenPayload }: CreateOfferRequest,
    res: Response
  ): Promise<void> {
    const result = await this.offerService.create({
      ...body,
      hostId: tokenPayload.id,
    });
    const offer = await this.offerService.findById(result.id);
    this.created(res, fillDTO(OfferRdo, offer));
  }

  public async show(req: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = req.params;
    const userId = req.tokenPayload?.id;
    const offer = await this.offerService.findById(offerId, userId);

    this.ok(res, fillDTO(OfferRdo, this.imagePathTransformer.execute(offer)));
  }

  public async delete(
    req: Request<ParamOfferId>,
    res: Response
  ): Promise<void> {
    const { offerId } = req.params;
    const userId = req.tokenPayload.id;
    const offer = await this.offerService.deleteById(offerId, userId);

    await this.reviewService.deleteByOfferId(offerId);

    this.noContent(res, offer);
  }

  public async update(
    req: Request<ParamOfferId, unknown, UpdateOfferDto>,
    res: Response
  ): Promise<void> {
    const userId = req.tokenPayload.id;
    const offerId = req.params.offerId;
    const body = req.body;
    const updateOffer = await this.offerService.updateById(
      offerId,
      userId,
      body
    );

    this.ok(res, fillDTO(OfferRdo, updateOffer));
  }

  public async getReviews(
    { params }: Request<ParamOfferId>,
    res: Response
  ): Promise<void> {
    const reviews = await this.reviewService.findByOfferId(params.offerId);
    this.ok(res, fillDTO(ReviewRdo, reviews));
  }

  public async getPremium(
    req: Request<ParamCityName>,
    res: Response
  ): Promise<void> {
    const { cityName } = req.params;
    const userId = req.tokenPayload?.id;
    const premium = await this.offerService.getPremium(cityName, userId);
    this.ok(res, fillDTO(OffersRdo, premium));
  }

  public async uploadImage(req: Request<ParamOfferId>, res: Response) {
    const offerId = req.params.offerId;
    const userId = req.tokenPayload.id;
    const file = req.file;
    const updateDto = { imagePreview: file?.filename };
    await this.offerService.updateById(offerId, userId, updateDto);
    this.created(res, fillDTO(UploadImageRdo, updateDto));
  }

  public async uploadImages(req: Request<ParamOfferId>, res: Response) {
    const offerId = req.params.offerId;
    const userId = req.tokenPayload.id;
    const files = req.files;
    if (!Array.isArray(files)) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        'Invalid input data for rent offer files',
        'DefaultRentOfferController'
      );
    }
    const filenames = files.map((file) => file.filename);

    const updateDto = { images: filenames };
    await this.offerService.updateById(offerId, userId, updateDto);
    this.created(res, fillDTO(UploadImagesRdo, updateDto));
  }
}
