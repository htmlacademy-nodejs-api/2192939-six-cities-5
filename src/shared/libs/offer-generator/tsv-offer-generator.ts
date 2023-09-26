import { City } from './../../types/city.types';
import dayjs from 'dayjs';
import {
  getImages,
  getRandomItem,
  getRandomItems,
} from '../../helpers/common.js';
import { Location, MockServerData } from '../../types/index.js';
import { OfferGenerator } from './index.js';
import { generateRandomValue } from '../../helpers/common.js';
import { randomUUID } from 'node:crypto';

const enum Rating {
  Min = 1,
  Max = 5,
}

const enum Bedrooms {
  Min = 1,
  Max = 8,
}

const enum Adults {
  Min = 1,
  Max = 10,
}

const enum Price {
  Min = 100,
  Max = 100000,
}

const enum Reviews {
  Min = 0,
  Max = 20,
}

const enum WeekDay {
  First = 1,
  Last = 7,
}

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const city = getRandomItem<City>(this.mockData.cities);
    const location = getRandomItem<Location>(this.mockData.locations);

    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const date = dayjs()
      .subtract(generateRandomValue(WeekDay.First, WeekDay.Last), 'day')
      .toISOString();
    const type = getRandomItem<string>(this.mockData.types);
    const price = generateRandomValue(Price.Min, Price.Max).toString();
    const images = getImages(this.mockData.images).join(';');
    const cityName = city.name;
    const cityLatitude = city.location.latitude.toString();
    const cityLongitude = city.location.longitude.toString();
    const cityZoom = city.location.zoom.toString();
    const imagePreview = getRandomItem<string>(this.mockData.images);
    const offerLatitude = location.latitude.toString();
    const offerLongitude = location.longitude.toString();
    const offerZoom = location.zoom.toString();
    const goods = getRandomItems<string>(this.mockData.goods).join(';');
    const hostId = randomUUID();
    const isPremium = 'false';
    const isFavorite = 'false';
    const rating = generateRandomValue(Rating.Min, Rating.Max, 1).toString;
    const bedrooms = generateRandomValue(Bedrooms.Min, Bedrooms.Max).toString();
    const maxAdults = generateRandomValue(Adults.Min, Adults.Max).toString();
    const quantityReviews = generateRandomValue(
      Reviews.Min,
      Reviews.Max
    ).toString();

    return [
      title,
      description,
      date,
      type,
      price,
      images,
      cityName,
      cityLatitude,
      cityLongitude,
      cityZoom,
      imagePreview,
      offerLatitude,
      offerLongitude,
      offerZoom,
      goods,
      hostId,
      isPremium,
      isFavorite,
      rating,
      bedrooms,
      maxAdults,
      quantityReviews,
    ].join('\t');
  }
}
