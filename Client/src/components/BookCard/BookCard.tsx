import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import css from './BookCard.module.css';
import { IBookProps } from '../../interfaces';
import { mainConfig } from '../../configs';
import { Ratings } from '../Ratings/Ratings';
import { Views } from '../Views/Views';
import { Download } from '../Download/Download';
import { deleteConstant, routePathConstant } from '../../constants';
import { useAppSelector } from '../../hooks';
import { RoleEnum } from '../../enums';
import { Delete } from '../admin/icons/Delete/Delete';
import { Update } from '../admin/icons/Update/Update';

export const BookCard: FC<IBookProps> = (book) => {
    const { user } = useAppSelector((state) => state.userReducer);

    const {
        book: bookDetail,
    } = book;

    const {
        id, cover, name, fileText, ratings, author,
    } = bookDetail;

    const { id: authorId, firstName, lastName } = author;

    const domainCloudName = mainConfig.CLOUD_DOMAIN_NAME;

    return (
        <div className={css.book_card}>
            { (user && user?.role === RoleEnum.ADMIN) && (
                <div className={css.book_card_admin_icons}>
                    <Update type={deleteConstant.book} book={bookDetail} />
                    <Delete type={deleteConstant.book} book={bookDetail} />
                </div>
            ) }
            <Link className={css.book_card_link} to={`${routePathConstant.books}/${id}`} state={{ book: bookDetail, author }}>
                <img src={domainCloudName + cover} alt={name} />
            </Link>

            <div className={css.book_card__main_info}>
                <h3 className={css.book_card__name}>{name}</h3>
                <Link className={css.book_card_link} to={`/${routePathConstant.authors}/${authorId}`} state={author}>
                    <p className={css.book_card_author_name}>{ firstName } { lastName }</p>
                </Link>
            </div>

            <Ratings ratings={ratings} bookId={id} />

            <div className={css.book_card__main_info}>
                <Views bookId={id} newView={null} />
                <Download fileName='' fileLink={`${mainConfig.CLOUD_DOMAIN_NAME_FOR_FILES}${fileText}`} />
            </div>
        </div>
    );
};
