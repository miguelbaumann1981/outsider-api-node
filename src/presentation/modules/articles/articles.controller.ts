import { Request, Response } from 'express';
import { ArticlesService } from '../../services';
import { PaginationDto } from '../../../domain/dtos';
import { handleControllerError } from '../../../domain/errors';

export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  getArticles = async (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;
    const category = req.query.category as
      | 'POETRY'
      | 'NOVELS'
      | 'HISTORY'
      | undefined;
    const [error, paginationDto] = PaginationDto.create(+page, +limit);
    if (error) throw res.status(400).json({ error });

    this.articlesService
      .getArticles(paginationDto!, category)
      .then((articles) => res.json(articles))
      .catch(() => handleControllerError(error, res));
  };

  getArticle = async (req: Request, res: Response) => {
    const { slug } = req.params;
    if (!slug) throw res.status(400).json({ error: 'SLUG_REQUIRED' });

    this.articlesService
      .getArticleBySlug(slug as string)
      .then((article) => res.json(article))
      .catch((error) => handleControllerError(error, res));
  };
}
