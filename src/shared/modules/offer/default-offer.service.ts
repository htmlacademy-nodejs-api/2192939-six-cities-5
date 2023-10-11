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
import {
  DEFAULT_OFFER_COUNT,
  DEFAULT_PREMIUM_OFFER_COUNT,
} from './offer.constants.js';

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

  public async find(count?: number): Promise<DocumentType<OfferEntity>[]> {
    const limit = count ?? DEFAULT_OFFER_COUNT;
    return this.offerModel
      .find({}, {}, { limit })
      .sort({ createdAt: SortType.Down })
      .exec();
  }

  public async findById(
    offerId: string
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findById(offerId).populate(['hostId']).exec();
  }

  findPremium(cityName: string): Promise<DocumentType<OfferEntity>[] | null> {
    return this.offerModel
      .find(
        { name: cityName, isPremium: true },
        {},
        { DEFAULT_PREMIUM_OFFER_COUNT }
      )
      .sort({ createdAt: SortType.Down })
      .exec();
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

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel.exists({ _id: documentId })) !== null;
  }

  public async incCommentCount(
    offerId: string
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, { $inc: { commentCount: 1 } })
      .exec();
  }
}
