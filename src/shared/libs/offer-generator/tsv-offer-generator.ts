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

const MIN_RATING = 1;
const MAX_RATING = 5;

const MIN_BEDROOMS = 1;
const MAX_BEDROOMS = 8;

const MIN_ADULTS = 1;
const MAX_ADULTS = 10;

const MIN_PRICE = 100;
const MAX_PRICE = 100000;

const MIN_REVIEWS = 0;
const MAX_REVIEWS = 20;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

type City = {
  name: string;
  location: Location;
};

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const city = getRandomItem<City>(this.mockData.cities);
    const location = getRandomItem<Location>(this.mockData.locations);

    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const date = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();
    const type = getRandomItem<string>(this.mockData.types);
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
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
    const rating = generateRandomValue(MIN_RATING, MAX_RATING, 1).toString;
    const bedrooms = generateRandomValue(MIN_BEDROOMS, MAX_BEDROOMS).toString();
    const maxAdults = generateRandomValue(MIN_ADULTS, MAX_ADULTS).toString();
    const quantityReviews = generateRandomValue(
      MIN_REVIEWS,
      MAX_REVIEWS
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
