import { CommonObject } from '../../interfaces';

export class ReleasesDto {
  constructor(
    public readonly index: number,
    public readonly month: string,
    public readonly year: number,
    public readonly release: string,
    public readonly name: string,
  ) {}

  static create(object: CommonObject): [string | undefined, ReleasesDto?] {
    const { index, month, year, release, name } = object;

    if (!index) return ['MISSING_INDEX'];
    if (!month) return ['MISSING_MONTH'];
    if (!year) return ['MISSING_YEAR'];
    if (!release) return ['MISSING_RELEASE'];
    if (!name) return ['MISSING_NAME'];

    return [undefined, new ReleasesDto(index, month, year, release, name)];
  }
}
