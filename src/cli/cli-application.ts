import { CommandParser, Command } from './index.js';

/**
 * Тип коллекции у которой ключи строковые, а значения соответствуют интерфейсу Command
 */
type CommandCollection = Record<string, Command>;

/**
 * Менеджер команд. Реализует методы для CLI приложения
 * Хранит экземпляры всех доступных команд
 */
export class CLIApplication {
  private commands: CommandCollection = {};

  constructor(private readonly defaultCommand: string = '--help') {}

  /**
   * Метод для регистрации команд. На вход получает массив команд (массив экземпляров
   * классов, которые реализуют интерфейс Command).
   * Задача перебрать массив команд и добавить в свойство commands с привязкой
   * к строковому названию команды
   */
  public registerCommands(commandList: Command[]): void {
    commandList.forEach((command) => {
      /**Проверяет есть ли уже такая зарегистрированная команда*/
      if (Object.hasOwn(this.commands, command.getName())) {
        throw new Error(`Command ${command.getName()} is already registered`);
      }
      /**Если команды нет - записываем ее название */
      this.commands[command.getName()] = command;
    });
  }

  /** Получает экземпляр команды по имени*/
  public getCommand(commandName: string): Command | never {
    /**Выполняет проверку: если пользователь не ввел команду, то вызывает help */
    return this.commands[commandName] ?? this.getDefaultCommand();
  }

  /**Возвращает команду по умолчанию */
  public getDefaultCommand(): Command | never {
    /**Выполняет проверку что дефолтная команда зарегистрирована */
    if (!this.commands[this.defaultCommand]) {
      throw new Error(
        `The default command (${this.defaultCommand}) is not registered`
      );
    }

    return this.commands[this.defaultCommand];
  }

  /** Метод запуска команды*/
  public processCommand(argv: string[]): void {
    /**Распарсить все команды */
    const parsedCommand = CommandParser.parse(argv);
    /** Находит имя команды - извлекает ключи из объекта*/
    const [commandName] = Object.keys(parsedCommand);
    /**По имени команды получает ее экземпляр */
    const command = this.getCommand(commandName);
    /**Получает по имени команды ее аргументы если нет - то пустой массив */
    const commandArguments = parsedCommand[commandName] ?? [];
    /**Выполняет команду */
    command.execute(...commandArguments);
  }
}
