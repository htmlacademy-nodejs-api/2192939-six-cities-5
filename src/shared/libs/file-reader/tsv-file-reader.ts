import { readFileSync } from 'node:fs';
import { FileReader } from './file-reader.interface.js';
import { Offer } from '../../types/offer.types.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(private readonly filename: string) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(
        ([
          id,
          title,
          description,
          type,
          price,
          images,
          cityName,
          cityLatitude,
          cityLongitude,
          cityZoom,
          offerLatitude,
          offerLongitude,
          offerZoom,
          goods,
          isPro,
          hostName,
          avatarUrl,
          isPremium,
          isFavorite,
          rating,
          bedrooms,
          maxAdults,
        ]) => ({
          id,
          title,
          description,
          type,
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
          location: {
            latitude: Number.parseFloat(offerLatitude),
            longitude: Number.parseFloat(offerLongitude),
            zoom: Number.parseInt(offerZoom, 10),
          },
          goods: goods.split(';').map((good) => good),
          host: {
            isPro: isPro === 'true',
            name: hostName,
            avatarUrl,
          },
          isPremium: isPremium === 'true',
          isFavorite: isFavorite === 'true',
          rating: Number.parseFloat(rating),
          bedrooms: Number.parseInt(bedrooms, 10),
          maxAdults: Number.parseInt(maxAdults, 10),
        })
      );
  }
}
