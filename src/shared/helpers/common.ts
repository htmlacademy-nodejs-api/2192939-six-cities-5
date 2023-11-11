import { ClassConstructor, plainToInstance } from 'class-transformer';
import { ValidationError } from 'class-validator';
import { ApplicationError, ValidationErrorField } from '../libs/rest/index.js';

const QUANTITY_IMAGES = 6;

export function generateRandomValue(min: number, max: number, precision = 0) {
  return +(Math.random() * (max - min) + min).toFixed(precision);
}

export function getRandomItems<T>(items: T[]): T[] {
  const startPosition = generateRandomValue(0, items.length - 1);
  const endPosition =
    startPosition + generateRandomValue(startPosition, items.length - 1);
  return items.slice(startPosition, endPosition);
}

export function getRandomItem<T>(items: T[]): T {
  return items[generateRandomValue(0, items.length - 1)];
}

/**Выбирает из массива  QUANTITY_IMAGES случайных неповторяющихся изображений*/
export function getImages(items: string[]): string[] {
  const images = new Set<string>();
  while (images.size < QUANTITY_IMAGES) {
    images.add(getRandomItem(items));
  }
  return Array.from(images);
}

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : '';
}

export function fillDTO<T, V>(someDto: ClassConstructor<T>, plainObject: V) {
  const offers = plainToInstance(someDto, plainObject, {
    excludeExtraneousValues: true,
  });

  console.log(offers);
  return offers;
}

export function createErrorObject(
  errorType: ApplicationError,
  error: string,
  details: ValidationErrorField[] = []
) {
  return { errorType, error, details };
}

export function reduceValidationErrors(
  errors: ValidationError[]
): ValidationErrorField[] {
  return errors.map(({ property, value, constraints }) => ({
    property,
    value,
    messages: constraints ? Object.values(constraints) : [],
  }));
}

export function getFullServerPath(host: string, port: number) {
  return `http://${host}:${port}`;
}
