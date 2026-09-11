import { ArticleCategory } from '../data/enum';
import { ReleaseCode } from '../data/types';

export interface HomeLayout {
  releaseCode: ReleaseCode;
  isDraft: boolean;
  isPublished: boolean;
  features: FeaturesLayout[];
}

export interface FeaturesLayout {
  position: number;
  color: ColorFeature;
  category: ArticleCategory;
}

export interface ColorFeature {
  solid: string;
  hover: string;
}
