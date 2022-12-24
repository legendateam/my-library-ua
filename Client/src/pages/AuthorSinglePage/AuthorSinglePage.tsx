import React, { FC, useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

import css from './AuthorSinglePage.module.css';
import { IAuthorResponse, IParamsId } from '../../interfaces';
import { datesNormalize } from '../../utils';
import Genre from '../../components/Genre/Genre';
import { mainConfig } from '../../configs';
import { authorService } from '../../services';
import {
    Book, Delete, Title, Update,
} from '../../components';
import { deleteConstant, urls } from '../../constants';
import { useAppSelector } from '../../hooks';
import { RoleEnum } from '../../enums';

export const AuthorSinglePage: FC = () => {
    const { user } = useAppSelector((state) => state.userReducer);

    const [dates, setDates] = useState<string>('');
    const [author, setAuthor] = useState<IAuthorResponse>();

    const { state: stateHistory } = useLocation();
    const state = stateHistory as IAuthorResponse;

    const { id } = useParams() as IParamsId;

    useEffect(() => {
        if (state) {
            const dates = datesNormalize(state.dateBirthday, state.dateDeath);

            setDates(dates);
            setAuthor({ ...state });
        }

        if (!state) {
            (async () => {
                const oneAuthorById = await authorService.getOneById(Number(id));
                setAuthor(oneAuthorById.data);

                const dates = datesNormalize(oneAuthorById.data.dateBirthday, oneAuthorById.data.dateDeath);

                setDates(dates);
            })();
        }
    }, []);
    return (
        <div className={css.author__single}>

            <div className={css.author__single_description}>

                { author?.photo && <img src={`${mainConfig.CLOUD_DOMAIN_NAME}${author?.photo}`} alt={author?.firstName} /> }

                <div className={css.author__single_description_info}>

                    <h1>{author?.firstName} {author?.lastName}</h1>
                    { author?.pseudonym && <h2>Псевдонім: {author.pseudonym}</h2>}
                    { author?.dateDeath ? <p>Дати народження і смерті: <span className={css.author__single_date}>{dates}</span></p>
                        : <p>Дата народження: <span className={css.author__single_date}>{dates}</span></p> }

                    <ul>
                        <li className={css.author__single_description_info_genres}>Жанри: {
                            author?.genres?.map((genre) => <Genre key={genre.id} genre={genre} />)
                        }
                        </li>
                        <li>Країна: {author?.country}</li>
                    </ul>

                </div>

                { (user && author && user?.role === RoleEnum.ADMIN) && (
                    <div className={css.author__single_admin_icons}>
                        <Update type={deleteConstant.author} author={author} />
                        <Delete type={deleteConstant.author} authorId={author?.id} />
                    </div>
                ) }
            </div>

            { !!author?.books?.length && (
                <div className={css.author__single_books}>
                    <Title title='Книги' />
                    <div className={css.author__single_books_content}>
                        { author?.books?.map((book) => (
                            <Link key={book.id} to={`${urls.books}/${book.id}`} state={{ book, author }}>
                                <Book book={book} />
                            </Link>
                        )) }
                    </div>
                </div>
            ) }

            <div className={css.author__single_biography}>
                <Title title='Біографія' />
                <div className={css.author__single_biography_content}>
                    <p>{author?.biography}</p>
                </div>
            </div>
        </div>
    );
};
