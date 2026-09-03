import { CommonObject } from '../../interfaces';

export class LoginUserDto {
  private constructor(
    public email: string,
    public password: string,
  ) {}

  static create(object: CommonObject): [string | undefined, LoginUserDto?] {
    const { email, password } = object;

    if (!email) return ['MISSING_EMAIL'];
    if (!password) return ['MISSING_PASSWORD'];
    if (password.length < 6) return ['PASSWORD_MINLENTGH_6'];

    return [undefined, new LoginUserDto(email, password)];
  }
}
