import React, { FC } from 'react';
import Skeleton from '@mui/material/Skeleton';

import css from './AuthorSkeleton.module.css';

export const AuthorSkeleton: FC = () => (
    <div className={css.authors__page_skeleton}>
        <div className={css.authors__page_skeleton_author}>
            <Skeleton variant='rectangular' width={150} height={200} />
            <div className={css.authors__page_skeleton_author__info}>
                <Skeleton variant='text' width={70} sx={{ fontSize: '1rem' }} />
                <Skeleton variant='text' width={40} sx={{ fontSize: '0.7rem' }} />
            </div>
        </div>
    </div>
);
