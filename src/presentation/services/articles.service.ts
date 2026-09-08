import { ArticleCategory } from '../../data/enum/article-category.enum';
import { ArticleModel } from '../../data/mongo/models/article.model';
import { ReleaseCode } from '../../data/types';
import { CustomError } from '../../domain/errors';

export class ArticlesService {
  async getArticles() {
    try {
      const [articles, total] = await Promise.all([
        ArticleModel.find(),
        ArticleModel.countDocuments(),
      ]);

      return {
        total,
        articles,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async getArticlesByRelease(
    releaseCode: ReleaseCode,
    articleCategory?: ArticleCategory,
  ) {
    try {
      const [articles, total] = await Promise.all([
        articleCategory
          ? ArticleModel.find({ releaseCode, category: articleCategory })
          : ArticleModel.find({ releaseCode }),
        articleCategory
          ? ArticleModel.countDocuments({
              releaseCode,
              category: articleCategory,
            })
          : ArticleModel.countDocuments({ releaseCode }),
      ]);

      return {
        total,
        articles,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async getArticleBySlug(releaseCode: ReleaseCode, slug: string) {
    const article = await ArticleModel.findOne({ releaseCode, slug });
    if (!article) throw CustomError.badRequest('ARTICLE_NOT_FOUND');

    try {
      return article;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
