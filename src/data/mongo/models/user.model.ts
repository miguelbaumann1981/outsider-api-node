import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'NAME_REQUIRED'],
  },
  email: {
    type: String,
    required: [true, 'EMAIL_REQUIRED'],
    unique: true,
  },

  password: {
    type: String,
    required: [true, 'PASSWORD_REQUIRED'],
  },
});

userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    const { _id, password, __v, ...rest } = ret;
    return rest;
  },
});

export const UserModel = mongoose.model('User', userSchema);
