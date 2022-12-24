import React, { FC } from 'react';

import css from './Analytics.module.css';
import { IAnalyticsProps } from '../../../interfaces';
import { analyticsConstant } from '../../../constants';

const Analytics: FC<IAnalyticsProps> = (
    {
        views: { views, auth_views, unique_views },
        files: { readNumbers, downloadNumbers },
        countUsers,
    },
) => (
    <ul className={css.analytics}>
        <li>{analyticsConstant.COUNT_VIEWS} <b>{views}</b></li>
        <li>{analyticsConstant.COUNT_AUTH_VIEWS} <b>{auth_views}</b></li>
        <li>{analyticsConstant.COUNT_UNIQUE_VIEWS} <b>{unique_views}</b></li>
        <li>{analyticsConstant.COUNT_READS_BOOKS} <b>{readNumbers}</b></li>
        <li>{analyticsConstant.COUNT_DOWNLOADS_BOOKS} <b>{downloadNumbers}</b></li>
        <li>{analyticsConstant.COUNT_NEW_USERS} <b>{countUsers}</b></li>
    </ul>
);

export default Analytics;
