import { Request, Response } from 'express';
import { ArticlesService } from '../../services';
import { handleControllerError } from '../../../domain/errors';
import { ArticleCategory } from '../../../data/enum/article-category.enum';

export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  getArticles = async (req: Request, res: Response) => {
    this.articlesService
      .getArticles()
      .then((articles) => res.json(articles))
      .catch((error) => handleControllerError(error, res));
  };

  getArticlesByRelease = async (req: Request, res: Response) => {
    const { release } = req.params;
    if (typeof release !== 'string' || !release) {
      throw res.status(400).json({ error: 'RELEASE_REQUIRED' });
    }
    const category = req.query.category as ArticleCategory | undefined;

    this.articlesService
      .getArticlesByRelease(release, category)
      .then((articles) => res.json(articles))
      .catch((error) => handleControllerError(error, res));
  };

  getArticle = async (req: Request, res: Response) => {
    const { release } = req.params;
    if (typeof release !== 'string' || !release) {
      throw res.status(400).json({ error: 'RELEASE_REQUIRED' });
    }

    const { slug } = req.params;
    if (typeof slug !== 'string' || !slug) {
      throw res.status(400).json({ error: 'SLUG_REQUIRED' });
    }

    this.articlesService
      .getArticleBySlug(release, slug)
      .then((article) => res.json(article))
      .catch((error) => handleControllerError(error, res));
  };
}
