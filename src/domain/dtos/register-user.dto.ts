import { regularExps } from '../../config';
import { CommonObject } from '../../interfaces';

export class RegisterUserDto {
  private constructor(
    public name: string,
    public email: string,
    public password: string,
    public role?: string[],
  ) {}

  static create(object: CommonObject): [string | undefined, RegisterUserDto?] {
    const { name, email, password, role } = object;

    if (!name) return ['MISSING_NAME'];
    if (!email) return ['MISSING_EMAIL'];
    if (!regularExps.email.test(email)) return ['EMAIL_NOT_VALID'];
    if (!password) return ['MISSING_PASSWORD'];
    if (!regularExps.password.test(password)) return ['PASSWORD_INVALID'];

    return [undefined, new RegisterUserDto(name, email, password, role)];
  }
}
