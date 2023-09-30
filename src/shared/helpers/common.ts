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
