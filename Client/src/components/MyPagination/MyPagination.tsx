import React, { ChangeEvent, FC, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useSearchParams } from 'react-router-dom';
import { Skeleton } from '@mui/material';

import css from './MyPagination.module.css';
import { paginationTypeConstant, queryConstant } from '../../constants';
import { useAppDispatch } from '../../hooks';
import { StatusEnum } from '../../enums';
import {
    changeCommentsSkip, setPageAuthors, setPageComments, setPageBooksNovelty, setPageRatings, setPageGenres,
} from '../../store/slices/pagination.slice';
import { IMyPaginationProps } from '../../interfaces';

const MyPagination: FC<IMyPaginationProps> = ({
    page, count, status, perPage, type,
}: IMyPaginationProps) => {
    const dispatch = useAppDispatch();
    const [query, setQuery] = useSearchParams();

    const handlerPagination = (e: ChangeEvent<unknown>, value: number) => {
        switch (type) {
        case paginationTypeConstant.authors:
            dispatch(setPageAuthors({ page: value }));
            setQuery({ page: value.toString(), perPage: perPage.toString() });
            break;

        case paginationTypeConstant.comments:
            dispatch(setPageComments({ page: value }));
            setQuery({ commentsPage: value.toString(), commentsPerPage: perPage.toString() });
            break;

        case paginationTypeConstant.novelty:
            dispatch(setPageBooksNovelty({ page: value }));
            setQuery({ noveltyPage: value.toString(), noveltyPerPage: perPage.toString() });
            break;

        case paginationTypeConstant.ratings:
            dispatch(setPageRatings({ page: value }));
            setQuery({ ratingsPage: value.toString(), ratingsPerPage: perPage.toString() });
            break;

        case paginationTypeConstant.genres:
            dispatch(setPageGenres({ page: value }));
            setQuery({ genresPage: value.toString(), genresPerPage: perPage.toString() });
            // skip default
        }
    };

    useEffect(() => {
        switch (type) {
        case paginationTypeConstant.authors:
            if (!query.get(queryConstant.page) && !query.get(queryConstant.perPage)) {
                setQuery({ page: page.toString(), perPage: perPage.toString() });
                return;
            }

            dispatch(setPageAuthors({ page: Number(query.get(queryConstant.page)) }));
            break;

        case paginationTypeConstant.comments:
            if (!query.get(queryConstant.commentsPage) && !query.get(queryConstant.commentsPerPage)) {
                setQuery({ commentsPage: page.toString(), commentsPerPage: perPage.toString() });
                return;
            }

            dispatch(setPageComments({ page: Number(query.get(queryConstant.commentsPage)) }));
            dispatch(changeCommentsSkip());
            break;

        case paginationTypeConstant.novelty:
            if (!query.get(queryConstant.noveltyPage) && !query.get(queryConstant.noveltyPerPage)) {
                setQuery({ noveltyPage: page.toString(), noveltyPerPage: perPage.toString() });
                return;
            }
            dispatch(setPageBooksNovelty({ page: Number(query.get(queryConstant.noveltyPage)) }));
            break;

        case paginationTypeConstant.ratings:
            if (!query.get(queryConstant.ratingsPage) && !query.get(queryConstant.ratingsPerPage)) {
                setQuery({ ratingsPage: page.toString(), ratingsPerPage: perPage.toString() });
                return;
            }
            dispatch(setPageRatings({ page: Number(query.get(queryConstant.ratingsPage)) }));
            break;

        case paginationTypeConstant.genres:
            if (!query.get(queryConstant.genresPage) && !query.get(queryConstant.genresPerPage)) {
                setQuery({ ratingsPage: page.toString(), ratingsPerPage: perPage.toString() });
                return;
            }
            dispatch(setPageGenres({ page: Number(query.get(queryConstant.genresPage)) }));
            // skip default
        }
    }, [query.get(queryConstant.page), query.get(queryConstant.commentsPage), query.get(queryConstant.noveltyPage),
        query.get(queryConstant.ratingsPage), query.get(queryConstant.genresPage)]);

    return (
        <div className={css.content__pagination}>
            <Stack spacing={2}>
                {
                    status === StatusEnum.pending ? <Skeleton variant='rectangular' width={300} height={25} />
                        : (
                            <Pagination
                                count={Math.ceil(count / perPage)}
                                page={page}
                                onChange={handlerPagination}
                            />
                        )
                }
            </Stack>
        </div>
    );
};

export default MyPagination;
