import { handleControllerError } from '../../../domain/errors';
import { HomeLayoutService } from '../../services';
import { Request, Response } from 'express';

export class HomeLayoutController {
  constructor(private readonly homeLayoutService: HomeLayoutService) {}

  getHomeLayoutArticles = async (req: Request, res: Response) => {
    this.homeLayoutService
      .getHomeLayoutArticles()
      .then((homeProps) => res.json(homeProps))
      .catch((error) => handleControllerError(error, res));
  };
}
