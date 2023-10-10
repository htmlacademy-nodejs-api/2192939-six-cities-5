import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { ReviewEntity, ReviewService } from './index.js';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../libs/logger/logger.interface.js';

@injectable()
export class DefaultReviewService implements ReviewService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.ReviewModel)
    private readonly reviewModel: types.ModelType<ReviewEntity>
  ) {}

  public async create(): Promise<DocumentType<ReviewEntity>> {
    const review = new ReviewEntity();

    const result = await this.reviewModel.create(review);
    this.logger.info('New review created');

    return result;
  }

  public async findByOfferId(
    offerId: string
  ): Promise<Array<DocumentType<ReviewEntity> | null>> {
    return this.reviewModel.find({ offerId });
  }
}
