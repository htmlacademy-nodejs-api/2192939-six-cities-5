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

  public async setFavoriteById(
    offerId: string,
    status: string
  ): Promise<types.DocumentType<OfferEntity> | null> {
    /**
     * Константу нужно будет убрать, когда изучим авторизацию
     */
    const userId = '65333a4da8c0da8fc5a6a10a';
    await this.userModel
      .updateOne(
        { _id: userId },
        {
          [`$${status === '1' ? 'push' : 'pull'}`]: { favorites: offerId },
        }
      )
      .exec();

    this.logger.info(`Add or remove offer ${offerId} of user ${userId}`);

    return this.offerModel.findById(offerId).populate(['hostId']).exec();
  }

  public async getFavorites(): Promise<
    types.DocumentType<OfferEntity>[] | null
  > {
    /**
     * Константу нужно будет убрать, когда изучим авторизацию
     */
    const userId = '65333a4da8c0da8fc5a6a10a';
    const { favorites } = (await this.userModel
      .findById(userId)
      .exec()) as UserEntity;

    return this.offerModel.find({ _id: { $in: favorites } });
  }
}
