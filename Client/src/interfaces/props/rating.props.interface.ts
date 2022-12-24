import { IRatingsResponse } from '../response/ratings.response.interface';

export interface IRatingProps {
    ratings?: IRatingsResponse[],
    bookId?: number,
}
