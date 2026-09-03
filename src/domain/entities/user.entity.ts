import { CommonObject } from '../../interfaces';
import { CustomError } from '../errors/custom.error';

export class UserEntity {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public password: string,
  ) {}

  static fromObject(object: CommonObject) {
    const { id, _id, name, email, password } = object;

    if (!_id && !id) throw CustomError.badRequest('MISSING_ID');
    if (!name) throw CustomError.badRequest('MISSING_NAME');
    if (!email) throw CustomError.badRequest('MISSING_EMAIL');
    if (!password) throw CustomError.badRequest('MISSING_PASSWORD');

    return new UserEntity(_id || id, name, email, password);
  }
}
