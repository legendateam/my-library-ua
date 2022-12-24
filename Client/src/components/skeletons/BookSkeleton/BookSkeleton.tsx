import React, { FC } from 'react';
import Skeleton from '@mui/material/Skeleton';

import css from './BookSkeleton.module.css';

export const BookSkeleton: FC = () => (
    <div className={css.skeleton__book_card}>
        <div className={css.skeleton__book_card_img}>
            <Skeleton variant='rectangular' width={180} height={287} />
        </div>
        <div className={css.skeleton__book_card__main_info}>
            <div className={css.skeleton__book_card__name}>
                <Skeleton variant='text' width={200} sx={{ fontSize: '16px' }} />
            </div>
            <div>
                <Skeleton variant='text' width={100} />
            </div>
        </div>

        <Skeleton variant='rectangular' width={120} height={24} />

        <div className={css.skeleton__book_card__main_info}>
            <div>
                <Skeleton variant='rectangular' width={50} height={20} />
            </div>
            <div>
                <Skeleton variant='rectangular' width={150} height={36} />
            </div>
        </div>
    </div>
);
