import { City } from '../../types/index.js';
import dayjs from 'dayjs';
import {
  getImages,
  getRandomItem,
  getRandomItems,
  generateRandomValue,
} from '../../helpers/index.js';
import { Location, MockServerData } from '../../types/index.js';
import { OfferGenerator } from './index.js';
import { randomUUID } from 'node:crypto';

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
    const imagePreview = getRandomItem<string>(this.mockData.images);
    const offerLatitude = location.latitude.toString();
    const offerLongitude = location.longitude.toString();
    const goods = getRandomItems<string>(this.mockData.goods).join(';');
    const hostId = randomUUID();
    const isPremium = getRandomItem<number>(this.mockData.isPremium);
    const bedrooms = generateRandomValue(Bedrooms.Min, Bedrooms.Max).toString();
    const maxAdults = generateRandomValue(Adults.Min, Adults.Max).toString();
    const username = getRandomItem<string>(this.mockData.username);
    const email = getRandomItem<string>(this.mockData.email);
    const avatar = getRandomItem<string>(this.mockData.avatar);
    const isPro = getRandomItem<number>(this.mockData.isPro);

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
      imagePreview,
      offerLatitude,
      offerLongitude,
      goods,
      hostId,
      isPremium,
      bedrooms,
      maxAdults,
      username,
      email,
      avatar,
      isPro,
    ].join('\t');
  }
}
