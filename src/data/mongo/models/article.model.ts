import mongoose from 'mongoose';
import { ArticleCategory, Gender, Release } from '../../enum';

const articleSchema = new mongoose.Schema({
  authorArticle: {
    type: String,
    required: [true, 'AUTHOR_ARTICLE_REQUIRED'],
  },
  authorInfo: {
    type: String,
  },
  authorQuote: {
    type: String,
  },
  category: {
    type: String,
    required: [true, 'CATEGORY_REQUIRED'],
    enum: ArticleCategory,
  },
  content: {
    type: String,
  },
  contentGroup: {
    type: [Object],
    properties: {
      author: {
        type: String,
      },
      document: {
        type: String,
      },
      gender: {
        type: String,
      },
      history: {
        type: String,
      },
      title: {
        type: String,
      },
    },
  },
  gender: {
    type: String,
    required: [true, 'GENDER_REQUIRED'],
    enum: Gender,
  },
  image: {
    type: String,
  },
  quote: {
    type: String,
  },
  references: {
    type: String,
  },
  release: {
    type: String,
    required: [true, 'RELEASE_REQUIRED'],
    enum: Release,
  },
  slug: {
    type: String,
    required: [true, 'SLUG_REQUIRED'],
    unique: true,
  },

  titleArticle: {
    type: String,
    required: [true, 'TITLE_ARTICLE_REQUIRED'],
  },
  titleCategory: {
    type: String,
    required: [true, 'TITLE_CATEGORY_REQUIRED'],
  },
});

articleSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, ret) => {
    const { _id, __v, contentGroup, ...rest } = ret;

    return contentGroup?.length ? { ...rest, contentGroup } : rest;
  },
});

export const ArticleModel = mongoose.model('Article', articleSchema);
