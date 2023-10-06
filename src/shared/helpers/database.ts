/**
 * Функция для формирования строки подключения
 * @param username - имя пользователя
 * @param password - пароль пользователя
 * @param host - номер хоста
 * @param port - номер порта
 * @param databaseName - имя базы данных
 * @returns строка подключения
 */
export function getMongoURI(
  username: string,
  password: string,
  host: string,
  port: string,
  databaseName: string
): string {
  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=admin`;
}
