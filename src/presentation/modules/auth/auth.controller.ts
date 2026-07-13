import { Request, Response } from 'express';
import { AuthService } from '../../services';
import {
  LoginUserDto,
  NewPasswordUserDto,
  RegisterUserDto,
} from '../../../domain/dtos';
import { CustomError, handleControllerError } from '../../../domain/errors';

export class AuthController {
  constructor(public readonly authService: AuthService) {}

  registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);

    if (error) return res.status(400).json({ error });

    this.authService
      .registerUser(registerUserDto!)
      .then((user) => res.json(user))
      .catch((error) => handleControllerError(error, res));
  };

  loginUser = (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDto.create(req.body);

    if (error) return res.status(400).json({ error });

    this.authService
      .loginUser(loginUserDto!)
      .then((user) => res.json(user))
      .catch((error) => handleControllerError(error, res));
  };

  checkAuthStatus = async (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw CustomError.unauthorized('TOKEN_NOT_PROVIDED');

    this.authService
      .checkAuthStatus(token)
      .then((user) => res.json(user))
      .catch((error) => handleControllerError(error, res));
  };

  recoverPassword = async (req: Request, res: Response) => {
    const [error, newPasswordUserDto] = NewPasswordUserDto.update(req.body);
    if (error) return res.status(400).json({ error });

    this.authService
      .newPasswordUser(newPasswordUserDto!)
      .then((user) => res.json(user))
      .catch((error) => handleControllerError(error, res));
  };
}
