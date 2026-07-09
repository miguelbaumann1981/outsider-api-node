import { Request, Response } from 'express';
import { ArticlesService } from '../../services';

export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  getArticles = async (req: Request, res: Response) => {
    this.articlesService
      .getArticles()
      .then((articles) => res.json(articles))
      .catch(() =>
        res.status(500).json({ message: 'Error fetching articles' }),
      );
  };
}
