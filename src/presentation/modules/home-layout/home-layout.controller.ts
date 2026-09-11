import { HomeLayoutDto } from '../../../domain/dtos';
import { handleControllerError } from '../../../domain/errors';
import { HomeLayoutService } from '../../services';
import { Request, Response } from 'express';

export class HomeLayoutController {
  constructor(private readonly homeLayoutService: HomeLayoutService) {}

  getHomeLayoutArticles = async (req: Request, res: Response) => {
    this.homeLayoutService
      .getHomeLayoutArticles()
      .then((homeLayouts) => res.json(homeLayouts))
      .catch((error) => handleControllerError(error, res));
  };

  createHomeLayout = async (req: Request, res: Response) => {
    const [error, homeLayoutDto] = HomeLayoutDto.create({ ...req.body });
    if (error) throw res.status(400).json({ error });

    this.homeLayoutService
      .createNewHomeLayout(homeLayoutDto!)
      .then((homeLayout) => res.status(201).json(homeLayout))
      .catch((error) => handleControllerError(error, res));
  };

  updateHomeLayout = async (req: Request, res: Response) => {
    const { id } = req.params;
    const parsedId = Array.isArray(id) ? id[0] : id;

    if (!parsedId)
      throw res.status(400).json({ error: 'HOME_LAYOUT_REQUIRED' });

    this.homeLayoutService
      .updateHomeLayout(parsedId, req.body)
      .then((result) => res.status(200).json(result))
      .catch((error) => handleControllerError(error, res));
  };
}
