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

  async deleteUserById(id: string) {
    const user = await UserModel.findOne({ _id: id });
    if (!user) throw CustomError.badRequest('USER_NOT_FOUND');

    const userDeleted = await UserModel.deleteOne({ _id: id });
    if (userDeleted.deletedCount === 0)
      throw CustomError.badRequest('USER_NOT_DELETED');

    try {
      return user;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
