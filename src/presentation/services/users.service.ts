import { UserModel } from '../../data/mongo/models';
import { CustomError } from '../../domain/errors';

export class UsersService {
  async getUsers() {
    try {
      const [total, users] = await Promise.all([
        UserModel.countDocuments(),
        UserModel.find(),
      ]);

      return {
        total: total,
        users,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
