export class ArticleCategoryDto {
  private constructor(
    public readonly category: 'POETRY' | 'NOVELS' | 'HISTORY',
  ) {}

  static create(object: {
    [key: string]: any;
  }): [string | undefined, ArticleCategoryDto?] {
    const { category } = object;

    return [undefined, new ArticleCategoryDto(category)];
  }
}
