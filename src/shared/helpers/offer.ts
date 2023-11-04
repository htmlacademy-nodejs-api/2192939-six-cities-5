import { HousingType, Offer } from '../types/index.js';

export function createOffer(offerData: string): Offer {
  const [
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
  ] = offerData.replace('\n', '').split('\t');

  const user = {
    username,
    email,
    avatar,
    isPro: Boolean(Number.parseInt(isPro, 10)),
  };

  return {
    title,
    description,
    date: new Date(date),
    type: type as HousingType,
    price: Number.parseInt(price, 10),
    images: images.split(';').map((image) => image),
    city: {
      name: cityName,
      location: {
        latitude: Number.parseFloat(cityLatitude),
        longitude: Number.parseFloat(cityLongitude),
      },
    },
    imagePreview,
    location: {
      latitude: Number.parseFloat(offerLatitude),
      longitude: Number.parseFloat(offerLongitude),
    },
    goods: goods.split(';').map((good) => good),
    hostId,
    isPremium: Boolean(Number.parseInt(isPremium, 10)),
    bedrooms: Number.parseInt(bedrooms, 10),
    maxAdults: Number.parseInt(maxAdults, 10),
    user,
  };
}
