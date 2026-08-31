import { handleControllerError } from '../../../domain/errors';
import { UsersService } from '../../services';
import { Request, Response } from 'express';

export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  getUsers = async (req: Request, res: Response) => {
    this.usersService
      .getUsers()
      .then((users) => res.json(users))
      .catch((error) => handleControllerError(error, res));
  };
}
