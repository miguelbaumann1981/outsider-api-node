import { Collaborator, CommonObject } from '../../interfaces';

export class AboutUsDto {
  constructor(
    public readonly mainText: string,
    public readonly collaborators: Collaborator[],
    public readonly release: string,
    public readonly isDraft: boolean,
    public readonly isPublished: boolean,
  ) {}

  static create(object: CommonObject): [string | undefined, AboutUsDto?] {
    const { mainText, collaborators, release, isDraft, isPublished } = object;

    if (!mainText) return ['MISSING_MAIN_TEXT'];
    if (!collaborators) return ['MISSING_COLLABORATORS'];
    if (!Array.isArray(collaborators)) return ['COLLABORATORS_NOT_ARRAY'];
    if (!release) return ['MISSING_RELEASE'];
    if (!isDraft) return ['MISSING_IS_DRAFT'];
    if (!isPublished) return ['MISSING_IS_PUBLISHED'];

    return [
      undefined,
      new AboutUsDto(mainText, collaborators, release, isDraft, isPublished),
    ];
  }
}
