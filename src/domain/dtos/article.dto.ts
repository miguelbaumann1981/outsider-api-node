import { ArticleCategory } from '../../data/enum';
import { ReleaseCode } from '../../data/types';
import { CommonObject } from '../../interfaces';

export class ArticleDto {
  constructor(
    public readonly authorArticle: string,
    public readonly category: ArticleCategory,
    public readonly content: string,
    public readonly image: string,
    public readonly releaseCode: ReleaseCode,
    public readonly slug: string,
    public readonly titleArticle: string,
    public readonly titleCategory: string,
    public readonly isDraft: boolean,
    public readonly isPublished: boolean,
    public readonly subtitle?: string,
    public readonly references?: string,
    public readonly authorQuote?: string,
    public readonly authorInfo?: string,
    public readonly quote?: string,
  ) {}

  static create(object: CommonObject): [string | undefined, ArticleDto?] {
    const {
      authorArticle,
      category,
      content,
      image,
      releaseCode,
      slug,
      titleArticle,
      titleCategory,
      isDraft,
      isPublished,
      subtitle,
      references,
      authorQuote,
      authorInfo,
      quote,
    } = object;

    if (!authorArticle) return ['MISSING_AUTHOR_ARTICLE'];
    if (!category) return ['MISSING_CATEGORY'];
    if (!content) return ['MISSING_CONTENT'];
    if (!image) return ['MISSING_IMAGE'];
    if (!releaseCode) return ['MISSING_RELEASE_CODE'];
    if (!slug) return ['MISSING_SLUG'];
    if (!titleArticle) return ['MISSING_TITLE_ARTICLE'];
    if (!titleCategory) return ['MISSING_TITLE_CATEGORY'];
    if (!slug) return ['MISSING_SLUG'];

    return [
      undefined,
      new ArticleDto(
        authorArticle,
        category,
        content,
        image,
        releaseCode,
        slug,
        titleArticle,
        titleCategory,
        isDraft,
        isPublished,
        subtitle,
        references,
        authorQuote,
        authorInfo,
        quote,
      ),
    ];
  }
}
