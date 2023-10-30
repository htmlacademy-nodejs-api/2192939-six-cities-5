export const UpdateOfferValidationMessage = {
  title: {
    length: 'Мин. длина 10 символов, макс. длина 100',
  },
  description: {
    length: 'Мин. длина 20 символов, макс. длина 1024 символа',
  },
  city: {
    invalid: 'Должен быть один из шести городов',
  },
  imagePreview: {
    maxLength: 'Длина строки не должна превышать 256 символов',
  },
  images: {
    length: 'Должно быть 6 фотографий',
    invalidType: 'Должен быть массив строк',
  },
  isPremium: {
    invalidFormat: 'Должно быть логическим значением',
  },
  type: {
    invalid: 'Должно быть одно из значений: apartment, house, room, hotel',
  },
  bedrooms: {
    invalidFormat: 'Должно быть целое число',
    minValue: 'Минимальное значение 1',
    maxValue: 'Максимальное значение 8',
  },
  maxAdults: {
    invalidFormat: 'Должно быть целое число',
    minValue: 'Минимальное значение 1',
    maxValue: 'Максимальное значение 10',
  },
  price: {
    invalidFormat: 'Должно быть целое число',
    minValue: 'Минимальное значение 100',
    maxValue: 'Максимальное значение 100000',
  },
  goods: {
    invalidType: 'Должен быть массив строк',
  },
  hostId: {
    invalidType: 'Должен быть правильный идентификатор',
  },
  location: {
    invalidType: 'Долгота или широта должны быть числами',
  },
};
