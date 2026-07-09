import mongoose from 'mongoose';

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
    enum: ['POETRY', 'NOVELS', 'HISTORY'],
  },
  description: {
    type: String,
    required: [true, 'DESCRIPTION_REQUIRED'],
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
