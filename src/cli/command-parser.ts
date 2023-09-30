/**Ключ название команды, значение массив аргументов */
type ParsedCommand = Record<string, string[]>;

/** Получает массив параметров и отделяет команды от аргументов*/
export class CommandParser {
  /**Принимает массив строк и возвращает распарсенные команды
   * Статический метод - потому что нет состояния у объекта
   */
  static parse(cliArguments: string[]): ParsedCommand {
    const parsedCommand: ParsedCommand = {};
    let currentCommand = '';

    for (const argument of cliArguments) {
      /**Проверяем, что строка начинается с -- (это команда) */
      if (argument.startsWith('--')) {
        /**Сохраняем команду в соответствующее свойство и присваиваем пустой массив*/
        parsedCommand[argument] = [];
        currentCommand = argument;
      } else if (currentCommand && argument) {
        /**Если свойство заполнено, то это уже аргументы и добавляем их в массив */
        parsedCommand[currentCommand].push(argument);
      }
    }

    /**Возвращаем объект с разобранной командой */
    return parsedCommand;
  }
}
