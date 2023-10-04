/**Абстракция для DatabaseClient, чтобы напрямую не использовать Mongoose
 * имеет два метода
 * connect - для подключения к БД с параметром uri-путь соединения
 * disconnect - для отключения от БД
 */
export interface DatabaseClient {
  connect(uri: string): Promise<void>;
  disconnect(): Promise<void>;
}
