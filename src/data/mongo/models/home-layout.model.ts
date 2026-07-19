import mongoose from 'mongoose';
import { ArticleCategory } from '../../enum/article-category.enum';

const homeLayoutSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'TITLE_REQUIRED'],
  },
  position: {
    type: Number,
    required: [true, 'TITLE_REQUIRED'],
    enum: [1, 2, 3, 4, 5, 6],
  },
  orientation: {
    type: String,
    required: [true, 'ORIENTATION_REQUIRED'],
    enum: ['left', 'right'],
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
