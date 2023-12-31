import type { Comment } from '../../types/types';

import { formatDate, getStarsWidth } from '../../utils';

const Review = ({ text, date, rating, userId }: Comment) => {
  const { username, avatar } = userId;

  return (
    <li className='reviews__item'>
      <div className='reviews__user user'>
        <div className='reviews__avatar-wrapper user__avatar-wrapper'>
          <img
            className='reviews__avatar user__avatar'
            src={avatar}
            width={54}
            height={54}
            alt='Reviews avatar'
          />
        </div>
        <span className='reviews__user-name'>{username}</span>
      </div>
      <div className='reviews__info'>
        <div className='reviews__rating rating'>
          <div className='reviews__stars rating__stars'>
            <span
              style={{
                width: getStarsWidth(rating),
              }}
            />
            <span className='visually-hidden'>Rating</span>
          </div>
        </div>
        <p className='reviews__text'>{text}</p>
        <time className='reviews__time' dateTime={date}>
          {formatDate(date)}
        </time>
      </div>
    </li>
  );
};

export default Review;
