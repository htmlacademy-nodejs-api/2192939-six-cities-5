import { types } from '@typegoose/typegoose';
import { Container } from 'inversify';
import { Component } from '../../types/component.enum.js';
import { DefaultReviewService } from './default-review.service.js';
import { ReviewEntity, ReviewModel, ReviewService } from './index.js';
export function createReviewContainer() {
  const reviewContainer = new Container();
  reviewContainer
    .bind<ReviewService>(Component.ReviewService)
    .to(DefaultReviewService)
    .inSingletonScope();
  reviewContainer
    .bind<types.ModelType<ReviewEntity>>(Component.ReviewModel)
    .toConstantValue(ReviewModel);

  return reviewContainer;
}
