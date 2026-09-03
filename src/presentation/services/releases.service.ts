import { ReleaseModel } from '../../data/mongo/models';
import { ReleasesDto } from '../../domain/dtos';
import { CustomError } from '../../domain/errors';

export class ReleasesService {
  async getReleases() {
    try {
      const data = await ReleaseModel.find();
      if (!data) throw CustomError.badRequest('RELEASES_NOT_FOUND');

      return data;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async createRelease(releasesDto: ReleasesDto) {
    try {
      const newRelease = new ReleaseModel(releasesDto);
      await newRelease.save();
      return newRelease;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async updateRelease(id: string, releasesDto: ReleasesDto) {
    try {
      const release = await ReleaseModel.findOne({ _id: id });
      if (!release) throw CustomError.badRequest('RELEASE_NOT_FOUND');

      const updating = await ReleaseModel.updateOne(
        { _id: id },
        { $set: releasesDto },
      );
      if (updating.matchedCount === 0)
        throw CustomError.badRequest('RELEASE_NOT_FOUND');

      return {
        releaseId: id,
        message:
          updating.modifiedCount === 0
            ? 'NO_RELEASE_MODIFIED'
            : 'RELEASE_UPDATED',
        updateDate: new Date(),
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
