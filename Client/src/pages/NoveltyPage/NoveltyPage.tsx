import React, { FC, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useSearchParams } from 'react-router-dom';

import css from './NovetlyPage.module.css';
import { useAppDispatch, useAppSelector, useEffectOnce } from '../../hooks';
import {
    getAllNoveltyThunk, sortNoveltyByRating, sortNoveltyByViews,
    sortNoveltyByYear,
} from '../../store';
import { BookCard } from '../../components';
import MyPagination from '../../components/MyPagination/MyPagination';
import { paginationTypeConstant, queryConstant, sortConstant } from '../../constants';
import { StatusEnum } from '../../enums';
import { BookSkeleton } from '../../components/skeletons';
import Sort from '../../components/Sort/Sort';

dayjs.extend(utc);

export const NoveltyPage: FC = () => {
    const { countNovelty, booksNovelty, status } = useAppSelector((state) => state.bookReducer);
    const { pageBooksNovelty, perPageBooksNovelty } = useAppSelector((state) => state.paginationReducer);
    const dispatch = useAppDispatch();

    const [date, setDate] = useState<string>(dayjs.utc().subtract(7, 'day').format());
    const [query] = useSearchParams();

    useEffectOnce(() => {
        if (!booksNovelty) {
            dispatch(getAllNoveltyThunk({ startDay: date, page: 1 }));
        }
    });

    useEffect(() => {
        const page = query.get(queryConstant.noveltyPage);

        if (booksNovelty && pageBooksNovelty === Number(page) && (pageBooksNovelty >= 1 && pageBooksNovelty <= Math.ceil(
            countNovelty / perPageBooksNovelty,
        ))) {
            dispatch(getAllNoveltyThunk({ startDay: date, page: Number(page) }));
        }
    }, [pageBooksNovelty]);

    useEffect(() => {
        const querySort = query.getAll(queryConstant.sortBy).pop();

        if (querySort === sortConstant.date) {
            dispatch(sortNoveltyByYear());
        }

        if (querySort === sortConstant.rating) {
            dispatch(sortNoveltyByRating());
        }

        if (querySort === sortConstant.views) {
            dispatch(sortNoveltyByViews());
        }
    }, [query]);

    return (
        <div>
            { !booksNovelty?.length ? (
                <h2 className={css.novelty__page_not_found}>Нажаль новинок немає(</h2>
            ) : (
                <>
                    <div className={css.novelty__page__pagination}>
                        <Sort />
                        <MyPagination
                            page={pageBooksNovelty}
                            count={countNovelty}
                            status={status}
                            perPage={perPageBooksNovelty}
                            type={paginationTypeConstant.novelty}
                        />
                    </div>
                    <div className={css.novelty__page}>
                        { ((!booksNovelty || status === StatusEnum.pending) ? Array.from(new Array(perPageBooksNovelty))
                            : booksNovelty).map((novelty, index) => (novelty
                            ? <BookCard key={novelty.id} book={novelty} />
                            // eslint-disable-next-line react/no-array-index-key
                            : <BookSkeleton key={index} />))}
                    </div>
                </>
            ) }
        </div>
    );
};
