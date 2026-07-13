import { bcryptAdapter, envs, JwtAdapter } from '../../config';
import { UserModel } from '../../data/mongo/models';
import {
  LoginUserDto,
  NewPasswordUserDto,
  RegisterUserDto,
} from '../../domain/dtos';
import { UserEntity } from '../../domain/entities';
import { CustomError } from '../../domain/errors/custom.error';

export interface JwtPayload {
  id: string;
}

export class AuthService {
  constructor() {}

  public async registerUser(registerUserDto: RegisterUserDto) {
    const userStored = await UserModel.findOne({
      email: registerUserDto.email,
    });
    if (userStored) throw CustomError.badRequest('USER_ALREADY_EXIST');

    try {
      const newUser = new UserModel(registerUserDto);

      newUser.password = bcryptAdapter.hash(registerUserDto.password);

      await newUser.save();

      const token = await JwtAdapter.generateToken({ id: newUser.id });
      if (!token) throw CustomError.internalServer('ERROR_CREATE_JWT');

      const { password, ...userEntity } = UserEntity.fromObject(newUser);

      return {
        user: userEntity,
        token,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async loginUser(loginUserDto: LoginUserDto) {
    const user = await UserModel.findOne({ email: loginUserDto.email });
    if (!user) throw CustomError.badRequest('USER_NOT_FOUND');

    const isMatching = await bcryptAdapter.compare(
      loginUserDto.password,
      user.password,
    );
    if (!isMatching) throw CustomError.badRequest('PASSWORD_NOT_VALID');

    const { password, ...userEntity } = UserEntity.fromObject(user);

    const token = await JwtAdapter.generateToken({ id: user.id });
    if (!token) throw CustomError.internalServer('ERROR_CREATE_JWT');

    return {
      user: userEntity,
      token,
    };
  }

  public async newPasswordUser(newPasswordUserDto: NewPasswordUserDto) {
    const userStored = await UserModel.findOne({
      email: newPasswordUserDto.email,
    });
    if (!userStored) throw CustomError.badRequest('USER_NOT_FOUND');

    try {
      userStored.password = bcryptAdapter.hash(newPasswordUserDto.password);
      await userStored.save();

      const token = await JwtAdapter.generateToken({ id: userStored.id });
      if (!token) throw CustomError.internalServer('ERROR_CREATE_JWT');

      const { password, ...userEntity } = UserEntity.fromObject(userStored);

      return {
        user: userEntity,
        token,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  checkAuthStatus = async (token: string) => {
    const payload = await JwtAdapter.validateToken(token);
    if (!payload) throw CustomError.unauthorized('INVALID_TOKEN');

    const { id } = payload as { id: string };
    if (!id) throw CustomError.internalServer('ID_NOT_TOKEN');

    const user = await UserModel.findOne({ _id: id });
    if (!user) throw CustomError.internalServer('USER_NOT_FOUND');

    const { password, ...userEntity } = UserEntity.fromObject(user);

    return userEntity;
  };
}
