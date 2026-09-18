import { ArticleCategory } from '../../data/enum/article-category.enum';
import { ArticleModel } from '../../data/mongo/models/article.model';
import { ReleaseCode } from '../../data/types';
import { ArticleDto } from '../../domain/dtos';
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

  async createArticle(articleDto: ArticleDto) {
    try {
      const newArticle = new ArticleModel(articleDto);
      await newArticle.save();
      return newArticle;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async updateArticle(id: string, articleDto: ArticleDto) {
    try {
      const article = await ArticleModel.findOne({ _id: id });
      if (!article) throw CustomError.badRequest('RELEASE_NOT_FOUND');

      const updating = await ArticleModel.updateOne(
        { _id: id },
        { $set: articleDto },
      );
      if (updating.matchedCount === 0)
        throw CustomError.badRequest('ARTICLE_NOT_FOUND');

      return {
        releaseId: id,
        message:
          updating.modifiedCount === 0
            ? 'NO_ARTICLE_MODIFIED'
            : 'ARTICLE_UPDATED',
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
