


export class PaginationDto {

    private constructor(
        public readonly page: number,
        public readonly limit: number
    ) {}


    static create(page: number = 1, limit: number = 10): [string | undefined, PaginationDto?] {

        if (isNaN(page)) return ['PAGE_MUST_BE_NUMBER'];
        if (isNaN(limit)) return ['LIMIT_MUST_BE_NUMBER'];
        if (page <= 0) return ['PAGE_MUST_BE_GREATER_O'];
        if (limit <= 0) return ['LIMIT_MUST_BE_GREATER_O'];

        return [undefined, new PaginationDto(page, limit)];

    }


}