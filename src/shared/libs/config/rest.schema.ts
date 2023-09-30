import convict from 'convict';
import validator from 'convict-format-with-validator';

convict.addFormats(validator);

export type RestSchema = {
  PORT: number;
  SALT: string;
  DB_HOST: string;
};

/**Необходима для валидации входных данных приложения */
export const configRestSchema = convict<RestSchema>({
  PORT: {
    /**Описание переменной */
    doc: 'Port for incoming connection',
    /**Валидатор */
    format: 'port',
    /**Имя переменной */
    env: 'PORT',
    /**Значение по умолчанию обязательное */
    default: 4000,
  },
  SALT: {
    doc: 'Salt for password hash',
    format: String,
    env: 'SALT',
    default: null,
  },
  DB_HOST: {
    doc: 'IP address of the database server (MongoDB)',
    format: 'ipaddress',
    env: 'DB_HOST',
    default: '127.0.0.1',
  },
});
