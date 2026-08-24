import { AboutUsModel } from '../../data/mongo/models';
import { CustomError } from '../../domain/errors';

export class AboutUssService {
  async getAboutUsInfo() {
    try {
      const data = await AboutUsModel.find();

      return data;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
