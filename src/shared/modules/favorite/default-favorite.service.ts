import mongoose from 'mongoose';
import { inject, injectable } from 'inversify';
import { FavoriteService } from './index.js';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { types } from '@typegoose/typegoose';
import { OfferEntity } from '../offer/index.js';
import { UserEntity } from '../user/index.js';

@injectable()
export class DefaultFavoriteService implements FavoriteService {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferModel)
    private readonly offerModel: types.ModelType<OfferEntity>,
    @inject(Component.UserModel)
    private readonly userModel: types.ModelType<UserEntity>
  ) {}

  /**
   * Получает информацию об авторе предложения
   */
  private hostStage = [
    {
      $lookup: {
        from: 'users',
        localField: 'hostId',
        foreignField: '_id',
        as: 'host',
      },
    },
    {
      $addFields: {
        hostId: { $arrayElemAt: ['$host', 0] },
      },
    },
    { $unset: 'host' },
  ];

  public async setFavoriteById(
    offerId: string,
    status: string,
    userId: string
  ): Promise<types.DocumentType<OfferEntity> | null> {
    await this.userModel
      .updateOne(
        { _id: userId },
        {
          [`$${status === '1' ? 'push' : 'pull'}`]: {
            favorites: offerId,
          },
        }
      )
      .exec();

    this.logger.info(`Add or remove offer ${offerId} of user ${userId}`);

    return this.offerModel
      .aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(offerId),
          },
        },
        {
          $addFields: {
            isFavorite: {
              $cond: {
                if: { $eq: [status, '1'] },
                then: true,
                else: false,
              },
            },
          },
        },
        ...this.hostStage,
      ])
      .exec()
      .then((r) => r.at(0) || null);
  }

  public async getFavorites(
    userId: string
  ): Promise<types.DocumentType<OfferEntity>[] | null> {
    const { favorites } = (await this.userModel
      .findById(userId)
      .exec()) as UserEntity;

    const favoriteOffers = await this.offerModel.find({
      _id: { $in: favorites },
    });

    favoriteOffers.forEach((favoriteOffer) => {
      Object.assign(favoriteOffer, { isFavorite: true });
    });

    return favoriteOffers;
  }
}
