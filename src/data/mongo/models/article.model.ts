import mongoose from 'mongoose';
import { ArticleCategory } from '../../enum/article-category.enum';
import { Release } from '../../enum/release.enum';

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'TITLE_REQUIRED'],
    unique: true,
  },
  subtitle: {
    type: String,
    required: [true, 'SUBTITLE_REQUIRED'],
    unique: true,
  },
  slug: {
    type: String,
    required: [true, 'SLUG_REQUIRED'],
    unique: true,
  },
  category: {
    type: String,
    required: [true, 'CATEGORY_REQUIRED'],
    enum: ArticleCategory,
  },
  content: {
    type: String,
    required: [true, 'CONTENT_REQUIRED'],
  },
  author: {
    type: String,
    required: [true, 'AUTHOR_REQUIRED'],
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
    required: [true, 'CREATED_AT_REQUIRED'],
  },
  release: {
    type: String,
    required: [true, 'RELEASE_REQUIRED'],
    enum: Release,
  },
});

articleSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    const { _id, __v, ...rest } = ret;
    return rest;
  },
});

export const ArticleModel = mongoose.model('Article', articleSchema);
