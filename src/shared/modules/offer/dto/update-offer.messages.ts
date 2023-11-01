export const UpdateOfferValidationMessage = {
  title: {
    length: 'Min. length 10 characters, max. length 100',
  },
  description: {
    length: 'Min. length 20 characters, max. length 1024 characters',
  },
  city: {
    invalid: 'Must be one of six cities',
  },
  imagePreview: {
    maxLength: 'Line length must not exceed 256 characters',
  },
  images: {
    length: 'Must be 6 photos',
    invalidType: 'Must be an array of strings',
  },
  isPremium: {
    invalidFormat: 'Must be a boolean',
  },
  type: {
    invalid:
      'Must be one of the following values: apartment, house, room, hotel',
  },
  bedrooms: {
    invalidFormat: 'Must be an integer',
    minValue: 'Minimum value 1',
    maxValue: 'Maximum value 8',
  },
  maxAdults: {
    invalidFormat: 'Must be an integer',
    minValue: 'Minimum value 1',
    maxValue: 'Maximum value 10',
  },
  price: {
    invalidFormat: 'Must be an integer',
    minValue: 'Minimum value 100',
    maxValue: 'Maximum value 100000',
  },
  goods: {
    invalidType: 'Must be an array of strings',
  },
  hostId: {
    invalidType: 'Must be a valid ID',
  },
  location: {
    invalidType: 'Longitude or latitude must be numbers',
  },
};
