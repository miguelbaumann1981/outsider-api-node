import { AboutUsModel } from '../../data/mongo/models';
import { AboutUsDto } from '../../domain/dtos';
import { CustomError } from '../../domain/errors';

export class AboutUsService {
  async getAboutUsInfo() {
    const data = await AboutUsModel.find();
    if (!data) throw CustomError.badRequest('INFO_NOT_FOUND');

    try {
      return data;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async createAboutUsInfo(aboutUsDto: AboutUsDto) {
    try {
      const newInfo = new AboutUsModel(aboutUsDto);
      await newInfo.save();
      return newInfo;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async updateAboutUsInfo(id: string, aboutUsDto: AboutUsDto) {
    try {
      const info = await AboutUsModel.findOne({ _id: id });
      if (!info) throw CustomError.badRequest('INFO_NOT_FOUND');

      const updating = await AboutUsModel.updateOne(
        { _id: id },
        { $set: aboutUsDto },
      );
      if (updating.matchedCount === 0)
        throw CustomError.badRequest('INFO_NOT_FOUND');

      return {
        infoId: id,
        message:
          updating.modifiedCount === 0 ? 'NO_INFO_MODIFIED' : 'INFO_UPDATED',
        updateDate: new Date(),
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
