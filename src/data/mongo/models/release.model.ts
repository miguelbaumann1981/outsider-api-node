import mongoose from 'mongoose';

const releaseSchema = new mongoose.Schema({
  index: {
    type: Number,
    required: true,
  },
  month: {
    type: String,
    required: [true, 'MONTH_REQUIRED'],
    enum: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  },
  year: {
    type: Number,
    required: [true, 'YEAR_REQUIRED'],
  },
  release: {
    type: String,
    required: [true, 'RELEASE_REQUIRED'],
  },
  name: {
    type: String,
    required: [true, 'NAME_REQUIRED'],
  },
});

releaseSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    const { _id, __v, ...rest } = ret;
    return rest;
  },
});

export const ReleaseModel = mongoose.model('Release', releaseSchema);
