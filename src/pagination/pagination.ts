import { IPaginationMeta } from './interfaces'

export class Pagination<PaginationObject> {
    constructor(
        /**
         * a list of items to be returned
         */
        public readonly content: PaginationObject[],
        /**
         * associated meta information (e.g., counts)
         */
        public readonly pagination: IPaginationMeta
    ) {}
}
