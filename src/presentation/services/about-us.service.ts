import { AboutUsModel } from '../../data/mongo/models';
import { CustomError } from '../../domain/errors';

export class AboutUsService {
  async getAboutUsInfo() {
    const data = await AboutUsModel.find();
    if (!data) throw CustomError.badRequest('INFO_NOT_FOUND');

    try {
      return data[0];
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
