import { ArticleModel } from '../../data/mongo/models/article.model';
import { ArticleCategoryDto, PaginationDto } from '../../domain/dtos';
import { CustomError } from '../../domain/errors';

export class ArticlesService {
  async getArticles(
    paginationDto: PaginationDto,
    articleCategory?: 'POETRY' | 'NOVELS' | 'HISTORY',
  ) {
    const { page, limit } = paginationDto;

    try {
      const [articles, total] = await Promise.all([
        articleCategory
          ? ArticleModel.find({ category: articleCategory })
              .skip((page - 1) * limit)
              .limit(limit)
          : ArticleModel.find()
              .skip((page - 1) * limit)
              .limit(limit),
        articleCategory
          ? ArticleModel.countDocuments({ category: articleCategory })
          : ArticleModel.countDocuments(),
      ]);
      return {
        page,
        limit,
        total,
        next: articleCategory
          ? `/api/articles?page=${page + 1}&limit=${limit}&category=${articleCategory}`
          : `/api/articles?page=${page + 1}&limit=${limit}`,
        previous:
          page - 1 > 0
            ? articleCategory
              ? `/api/articles?page=${page - 1}&limit=${limit}&category=${articleCategory}`
              : `/api/articles?page=${page - 1}&limit=${limit}`
            : null,
        articles,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async getArticleBySlug(slug: string) {
    const article = await ArticleModel.findOne({ slug });
    if (!article) throw CustomError.badRequest('ARTICLE_NOT_FOUND');

    try {
      return article;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
