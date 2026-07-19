import { HomeLayoutModel } from '../../data/mongo/models';
import { CustomError } from '../../domain/errors';

export class HomeLayoutService {
  async getHomeLayoutArticles() {
    try {
      const [props] = await Promise.all([HomeLayoutModel.find()]);

      return props;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
