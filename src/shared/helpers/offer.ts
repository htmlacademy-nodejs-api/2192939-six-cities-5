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
    username,
    email,
    avatar,
    isPro,
  ] = offerData.replace('\n', '').split('\t');

  const user = {
    username,
    email,
    avatar,
    isPro: Boolean(Number.parseInt(isPro)),
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
        zoom: Number.parseInt(cityZoom, 10),
      },
    },
    imagePreview,
    location: {
      latitude: Number.parseFloat(offerLatitude),
      longitude: Number.parseFloat(offerLongitude),
      zoom: Number.parseInt(offerZoom, 10),
    },
    goods: goods.split(';').map((good) => good),
    hostId,
    isPremium: isPremium === 'true',
    isFavorite: isFavorite === 'true',
    rating: Number.parseFloat(rating),
    bedrooms: Number.parseInt(bedrooms, 10),
    maxAdults: Number.parseInt(maxAdults, 10),
    quantityReviews: Number.parseInt(quantityReviews, 10),
    user,
  };
}
