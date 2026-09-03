import { ArticleCategory } from '../../data/enum/article-category.enum';
import { ArticleModel } from '../../data/mongo/models/article.model';
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
    release: string,
    articleCategory?: ArticleCategory,
  ) {
    try {
      const [articles, total] = await Promise.all([
        articleCategory
          ? ArticleModel.find({ release, category: articleCategory })
          : ArticleModel.find({ release }),
        articleCategory
          ? ArticleModel.countDocuments({ release, category: articleCategory })
          : ArticleModel.countDocuments({ release }),
      ]);

      return {
        total,
        articles,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async getArticleBySlug(release: string, slug: string) {
    const article = await ArticleModel.findOne({ release, slug });
    if (!article) throw CustomError.badRequest('ARTICLE_NOT_FOUND');

    try {
      return article;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
