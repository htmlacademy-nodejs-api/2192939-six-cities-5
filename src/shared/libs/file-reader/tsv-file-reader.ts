import { createReadStream } from 'node:fs';
import { FileReader } from './index.js';
import { EventEmitter } from 'node:events';

const CHUNK_SIZE = 16384; //16KB

/**Считывает данные из файла
 * @param filename - путь к файлу */
export class TSVFileReader extends EventEmitter implements FileReader {
  constructor(private readonly filename: string) {
    super();
  }

  public async read(): Promise<void> {
    /**Создаем поток ReadStream
     * @param filename - имя файла, который открываем на чтение
     * @option highWaterMark - размер буфера для считываемых данных
     * @option encoding - кодировка
     */
    const readStream = createReadStream(this.filename, {
      highWaterMark: CHUNK_SIZE,
      encoding: 'utf-8',
    });

    /**Хранит оставшиеся данные */
    let remainingData = '';
    /**Позиция следующей стоки после считанной */
    let nextLinePosition = -1;
    /**Количество считанных строк */
    let importedRowCount = 0;

    /**Асинхронный цикл */
    for await (const chunk of readStream) {
      /**Порция считанной информации приводится к строке и добавляем к считанным данным */
      remainingData += chunk.toString();

      /**На считанных данных определяется наличие символа перевода строки,
       * если нет возврат к внешнему циклу */
      while ((nextLinePosition = remainingData.indexOf('\n')) >= 0) {
        /**Если символ перевода строки есть - данные считываются в completeRow */
        const completeRow = remainingData.slice(0, nextLinePosition + 1);
        /**Из remainingData вырезается считанная строка */
        remainingData = remainingData.slice(++nextLinePosition);
        /**Увеличивается значение счетчика считанных строк */
        importedRowCount++;

        /**Отправляется событие о том, что строка считана */
        this.emit('line', completeRow);
      }
    }

    /**Отправляется событие о том, что вся информация считана */
    this.emit('end', importedRowCount);
  }
}
