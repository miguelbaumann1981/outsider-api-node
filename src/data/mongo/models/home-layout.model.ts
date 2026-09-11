import mongoose from 'mongoose';
import { ArticleCategory } from '../../enum';

const homeLayoutSchema = new mongoose.Schema({
  releaseCode: {
    type: String,
    required: [true, 'RELEASE_REQUIRED'],
  },
  isDraft: {
    type: Boolean,
    default: false,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  features: {
    type: Object,
    properties: {
      position: {
        type: Number,
        required: [true, 'POSITION_REQUIRED'],
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
    },
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
