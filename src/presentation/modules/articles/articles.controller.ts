import { Request, Response } from 'express';
import { ArticlesService } from '../../services';
import { handleControllerError } from '../../../domain/errors';
import { ArticleCategory } from '../../../data/enum/article-category.enum';
import { ReleaseCode } from '../../../data/types';
import { ArticleDto } from '../../../domain/dtos';

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
      .getArticlesByRelease(release as ReleaseCode, category)
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
      .getArticleBySlug(release as ReleaseCode, slug)
      .then((article) => res.json(article))
      .catch((error) => handleControllerError(error, res));
  };

  createArticle = async (req: Request, res: Response) => {
    const [error, articleDto] = ArticleDto.create({ ...req.body });
    if (error) throw res.status(400).json({ error });

    this.articlesService
      .createArticle(articleDto!)
      .then((info) => res.status(201).json(info))
      .catch((error) => handleControllerError(error, res));
  };

  updateArticle = async (req: Request, res: Response) => {
    const { id } = req.params;
    const parsedId = Array.isArray(id) ? id[0] : id;

    if (!parsedId) throw res.status(400).json({ error: 'RELEASE_REQUIRED' });

    this.articlesService
      .updateArticle(parsedId, req.body)
      .then((result) => res.status(200).json(result))
      .catch((error) => handleControllerError(error, res));
  };
}
