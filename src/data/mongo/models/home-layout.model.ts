import mongoose from 'mongoose';
import { ArticleCategory } from '../../enum';

const homeLayoutSchema = new mongoose.Schema({
  position: {
    type: Number,
    required: [true, 'TITLE_REQUIRED'],
    enum: [1, 2, 3, 4, 5, 6],
  },
  color: {
    type: Object,
    required: [true, 'COLOR_REQUIRED'],
    properties: {
      solid: {
        type: String,
        required: [true, 'SOLID_COLOR_REQUIRED'],
      },
      hover: {
        type: String,
        required: [true, 'HOVER_COLOR_REQUIRED'],
      },
    },
  },
  category: {
    type: String,
    required: [true, 'CATEGORY_REQUIRED'],
    enum: ArticleCategory,
  },
});

homeLayoutSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    const { _id, __v, ...rest } = ret;
    return rest;
  },
});

export const HomeLayoutModel = mongoose.model('HomeLayout', homeLayoutSchema);
