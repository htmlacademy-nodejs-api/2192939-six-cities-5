import { inject, injectable } from 'inversify';
import {
  CreateOfferDto,
  OfferEntity,
  OfferService,
  UpdateOfferDto,
} from './index.js';
import { Component, SortType } from '../../types/index.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { Logger } from '../../libs/logger/index.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel)
    private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async updateById(
    offerId: string,
    dto: UpdateOfferDto
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, { new: true })
      .exec();
  }

  public async deleteById(
    offerId: string
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndDelete(offerId).exec();
  }

  public async find(): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel.find().sort({ createdAt: SortType.Down }).exec();
  }

  public async findById(
    offerId: string
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findById(offerId).populate(['hostId']).exec();
  }

  findPremium(cityName: string): Promise<DocumentType<OfferEntity>[] | null> {
    return this.offerModel.find({ name: cityName, isPremium: true });
  }

  findFavorites(): Promise<DocumentType<OfferEntity>[] | null> {
    return this.offerModel.find({ isFavorite: true }).exec();
  }

  updateFavoriteById(
    offerId: string,
    status: number
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(
        offerId,
        { isFavorite: Boolean(status) },
        { new: true }
      )
      .exec();
  }
}
