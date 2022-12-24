import React, { FC } from 'react';

import css from './Book.module.css';
import { IBookProps } from '../../interfaces';
import { mainConfig } from '../../configs';
import { Ratings } from '../Ratings/Ratings';
import { useAppSelector } from '../../hooks';
import { RoleEnum } from '../../enums';
import { Update } from '../admin/icons/Update/Update';
import { Delete } from '../admin/icons/Delete/Delete';
import { deleteConstant } from '../../constants';

export const Book: FC<IBookProps> = ({ book }) => {
    const {
        id, cover, name, ratings,
    } = book;

    const { user } = useAppSelector((state) => state.userReducer);

    const domainCloudName = mainConfig.CLOUD_DOMAIN_NAME;

    return (
        <div className={css.book}>
            { (user && user?.role === RoleEnum.ADMIN) && (
                <div className={css.book__admin_icons}>
                    <Update type={deleteConstant.book} book={book} />
                    <Delete type={deleteConstant.book} />
                </div>
            ) }
            <img src={domainCloudName + cover} alt={name} />
            <Ratings ratings={ratings} bookId={id} />
        </div>
    );
};
