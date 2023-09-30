import { WriteStream, createWriteStream } from 'node:fs';
import { FileWriter } from './index.js';

export class TSVFileWriter implements FileWriter {
  private stream: WriteStream;

  constructor(filename: string) {
    /**Создаем WriteStream
     * @param filename - имя файла
     * @option flags: 'w' - флаг - файл при необходимости будет создан, а существующий - перезаписан
     * @option encoding - кодировка
     * @option autoClose - после окончания работы с потоком он будет автоматически закрыт
     */
    this.stream = createWriteStream(filename, {
      flags: 'w',
      encoding: 'utf-8',
      autoClose: true,
    });
  }

  /**Записывает строку row в файл */
  public async write(row: string): Promise<unknown> {
    /**Объявляется переменная в которую записывается строка данных */
    const writeSuccess = this.stream.write(`${row}\n`);
    /**Если данные не успели записаться - то ожидает очистки буфера */
    if (!writeSuccess) {
      /**Конструируем объект промиса, чтобы добиться паузы */
      return new Promise((resolve) => {
        /**Внутри промиса подписываемся однократно на событие 'drain'
         * которое генерируется потоками и при наступлении его
         * резолвим это событие, что означает очистку буфера
         */
        this.stream.once('drain', () => resolve(true));
      });
    }

    return Promise.resolve();
  }
}
