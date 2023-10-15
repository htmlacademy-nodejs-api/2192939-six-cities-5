import { inject, injectable } from 'inversify';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../types/index.js';
import { Request, Response } from 'express';
import { CreateOfferDto, OfferRdo, OfferService } from './index.js';
import { fillDTO } from '../../helpers/common.js';
import { BaseController, HttpMethod } from '../../libs/rest/index.js';

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
    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
  }

  public async read(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();
    const responseData = fillDTO(OfferRdo, offers);
    this.ok(res, responseData);
  }

  public async create(
    {
      body,
    }: Request<
      Record<string, unknown>,
      Record<string, unknown>,
      CreateOfferDto
    >,
    res: Response
  ): Promise<void> {
    console.log(body);

    const result = await this.offerService.create(body);
    this.created(res, fillDTO(OfferRdo, result));
  }
}
