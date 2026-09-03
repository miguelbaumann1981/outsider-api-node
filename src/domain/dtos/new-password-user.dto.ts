import { regularExps } from '../../config';
import { CommonObject } from '../../interfaces';

export class NewPasswordUserDto {
  private constructor(
    public email: string,
    public password: string,
  ) {}

  static update(
    object: CommonObject,
  ): [string | undefined, NewPasswordUserDto?] {
    const { email, password } = object;

    if (!password) return ['MISSING_PASSWORD'];
    if (!regularExps.password.test(password)) return ['PASSWORD_INVALID'];

    return [undefined, new NewPasswordUserDto(email, password)];
  }
}
