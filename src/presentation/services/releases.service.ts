import { ReleaseModel } from '../../data/mongo/models';
import { CustomError } from '../../domain/errors';

export class ReleasesService {
  async getReleases() {
    try {
      const [releases, total] = await Promise.all([
        ReleaseModel.find(),
        ReleaseModel.countDocuments(),
      ]);

      return {
        total,
        releases,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
