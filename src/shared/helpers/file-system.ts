import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export function getCurrentModuleDirectoryPath() {
  /**С помощью import.meta.url получает путь к файлу в виде URL
   * и преобразовывает его в обычный путь к файлу с помощью fileURLToPath
   */
  const filepath = fileURLToPath(import.meta.url);
  /**Удаляет в пути имя файла */
  return dirname(filepath);
}
