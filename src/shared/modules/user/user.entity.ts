import {
  defaultClasses,
  getModelForClass,
  prop,
  modelOptions,
  Severity,
} from '@typegoose/typegoose';
import { User } from '../../types/index.js';
import { createSHA256 } from '../../helpers/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({
    require: true,
    default: '',
    minlength: [1, 'Min length for username is 1'],
    maxlength: [15, 'Max length for username is 15'],
  })
  public username: string;

  @prop({
    unique: true,
    require: true,
  })
  public email: string;

  @prop({
    required: false,
    default: '',
  })
  public avatar: string;

  @prop({
    require: true,
    default: '',
  })
  private password?: string;

  @prop({
    require: true,
  })
  public isPro: boolean;

  @prop({ require: true })
  public favorites: string[];

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

  public verifyPassword(password: string,salt:string){
    const hashPassword=createSHA256(password,salt)
    return hashPassword===this.password
  }
}

export const UserModel = getModelForClass(UserEntity);
