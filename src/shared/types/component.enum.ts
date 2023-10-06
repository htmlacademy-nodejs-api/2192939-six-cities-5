export const Component = {
  RestApplication: Symbol.for('RestApplication'),
  Logger: Symbol.for('Logger'),
  Config: Symbol.for('Config'),
  DatabaseClient: Symbol.for('DatabaseClient'),
  UserContainer: Symbol.for('UserContainer'),
  UserModel: Symbol.for('UserModel'),
} as const;
