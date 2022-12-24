import { StatusEnum } from '../../enums';

export interface IMyPaginationProps {
    page: number,
    count: number,
    status: StatusEnum,
    perPage: number,
    type: string,
}
