import { ReleaseCode } from '../../data/types';
import { CommonObject, FeaturesLayout } from '../../interfaces';

export class HomeLayoutDto {
  constructor(
    public readonly releaseCode: ReleaseCode,
    public readonly isDraft: boolean,
    public readonly isPublished: boolean,
    public readonly features: FeaturesLayout[],
  ) {}

  static create(object: CommonObject): [string | undefined, HomeLayoutDto?] {
    const { releaseCode, isDraft, isPublished, features } = object;

    if (!releaseCode) return ['MISSING_RELEASE'];
    if (!Array.isArray(features)) return ['MISSING_FEATURES'];

    return [
      undefined,
      new HomeLayoutDto(releaseCode, isDraft, isPublished, features),
    ];
  }
}
