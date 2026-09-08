import { ReleaseCode } from '../../data/types';
import { CommonObject } from '../../interfaces';

export class ReleasesDto {
  constructor(
    public readonly index: number,
    public readonly month: string,
    public readonly year: number,
    public readonly releaseCode: ReleaseCode,
    public readonly name: string,
    public readonly isDraft: boolean,
    public readonly isPublished: boolean,
    public readonly isCurrentRelease: boolean,
  ) {}

  static create(object: CommonObject): [string | undefined, ReleasesDto?] {
    const {
      index,
      month,
      year,
      releaseCode,
      name,
      isDraft,
      isPublished,
      isCurrentRelease,
    } = object;

    if (!index) return ['MISSING_INDEX'];
    if (!month) return ['MISSING_MONTH'];
    if (!year) return ['MISSING_YEAR'];
    if (!releaseCode) return ['MISSING_RELEASE_CODE'];
    if (!name) return ['MISSING_NAME'];

    return [
      undefined,
      new ReleasesDto(
        index,
        month,
        year,
        releaseCode,
        name,
        isDraft,
        isPublished,
        isCurrentRelease,
      ),
    ];
  }
}
