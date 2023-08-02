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

userSchema.statics.isUserExist = async function (
  email: string
): Promise<Pick<IUser, '_id' | 'password' | 'email'> | null> {
  return await User.findOne({ email }, { _id: 1, password: 1, email: 1 });
};

userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

userSchema.pre('save', async function (next) {
  // hashing password
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bycrypt_salt_rounds)
  );

  next();
});
export const User = model<IUser, UserModel>('User', userSchema);
