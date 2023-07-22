import mongoose, { model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import config from '../../../config';
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema<IUser, UserModel>(
  {
    id: { type: String, required: true },
    password: { type: String, required: true, select: 0 },
    email: { type: String, required: true },
    name:  { type: String, required: false },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.pre('save', async function (next) {
  // hashing password
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bycrypt_salt_rounds)
  );

  next();
});
export const User = model<IUser, UserModel>('User', userSchema);
