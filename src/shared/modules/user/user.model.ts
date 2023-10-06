import { Document, Schema, model } from 'mongoose';
import { User } from '../../types/index.js';

export interface UserDocument extends User, Document {
  createAt: Date;
  updateAt: Date;
}

const userSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
      minlength: [1, 'Min length for username is 1'],
      maxlength: [15, 'Max length for username is 15'],
    },
    email: {
      type: String,
      unique: true,
      require: true,
      // match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect'],
    },
    avatar: {
      type: String,
      match: [/^(.+)(jpg|png)$/i, 'Avatar file is correct'],
    },
    password: {
      type: String,
      require: true,
      minlength: [6, 'Min length for password is 6'],
      maxlength: [12, 'Max length for password is 12'],
    },
    userType: {
      type: String,
      require: true,
      match: [/^(ordinary|pro)$/i, 'UserType is incorrect'],
    },
  },
  { timestamps: true }
);

export const UserModel = model<UserDocument>('User', userSchema);
