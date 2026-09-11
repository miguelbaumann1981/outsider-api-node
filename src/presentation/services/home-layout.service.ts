import { HomeLayoutModel } from '../../data/mongo/models';
import { HomeLayoutDto } from '../../domain/dtos';
import { CustomError } from '../../domain/errors';

export class HomeLayoutService {
  async getHomeLayoutArticles() {
    try {
      const data = await HomeLayoutModel.find();
      if (!data) throw CustomError.badRequest('INFO_NOT_FOUND');

      return data;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async createNewHomeLayout(homeLayoutDto: HomeLayoutDto) {
    try {
      const newLayout = new HomeLayoutModel(homeLayoutDto);
      await newLayout.save();
      return newLayout;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async updateHomeLayout(id: string, homeLayoutDto: HomeLayoutDto) {
    try {
      const layout = await HomeLayoutModel.findOne({ _id: id });
      if (!layout) throw CustomError.badRequest('INFO_NOT_FOUND');

      const updating = await HomeLayoutModel.updateOne(
        { _id: id },
        { $set: homeLayoutDto },
      );
      if (updating.matchedCount === 0)
        throw CustomError.badRequest('INFO_NOT_FOUND');

      return {
        homeLayoutId: id,
        message:
          updating.modifiedCount === 0
            ? 'NO_HOME_LAYOUT_MODIFIED'
            : 'HOME_LAYOUT_UPDATED',
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
