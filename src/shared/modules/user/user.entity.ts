import {
  defaultClasses,
  getModelForClass,
  prop,
  modelOptions,
} from '@typegoose/typegoose';
import { User } from '../../types/index.js';
import { createSHA256 } from '../../helpers/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
  },
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({
    require: true,
    // default: '',
    // minlength: [1, 'Min length for username is 1'],
    // maxlength: [15, 'Max length for username is 15'],
  })
  public username: string;

  @prop({
    unique: true,
    require: true,
    // match: [
    //   /^((([0-9A-Za-z]{1}[-0-9A-z\\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u,
    //   'Email is incorrect',
    // ],
  })
  public email: string;

  @prop({
    required: false,
    // default: '',
    // match: [/^(.+)(jpg|png)$/i, 'Avatar file is correct'],
  })
  public avatar: string;

  @prop({
    require: true,
    // default: '',
  })
  private password?: string;

  @prop({
    require: true,
  })
  public isPro: boolean;

  constructor(userData: User) {
    super();

    this.username = userData.username;
    this.email = userData.email;
    this.avatar = userData.avatar;
    this.isPro = userData.isPro;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
