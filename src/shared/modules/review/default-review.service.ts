import { CreateReviewDto } from './index.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { ReviewEntity, ReviewService } from './index.js';
import { Component } from '../../types/component.enum.js';

@injectable()
export class DefaultReviewService implements ReviewService {
  constructor(
    @inject(Component.ReviewModel)
    private readonly reviewModel: types.ModelType<ReviewEntity>
  ) {}

  public async create(
    dto: CreateReviewDto
  ): Promise<DocumentType<ReviewEntity>> {
    const review = await this.reviewModel.create(dto);

    return review.populate('userId');
  }

  public async findByOfferId(
    offerId: string
  ): Promise<Array<DocumentType<ReviewEntity>[] | null>> {
    return this.reviewModel.find({ offerId }).populate('userId');
  }
}
