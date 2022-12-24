import React, { FC, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import css from './EditAuthorPage.module.css';
import { IAuthorResponse } from '../../interfaces';
import { authorService } from '../../services';
import { HttpStatusEnum } from '../../enums';
import EditAuthorForm from '../../components/admin/EditAuthorForm/EditAuthorForm';

export const EditAuthorPage: FC = () => {
    const { state } = useLocation();
    const stateAuthor = state as IAuthorResponse;

    const { id } = useParams();

    const [author, setAuthor] = useState<IAuthorResponse | null>(null);

    useEffect(() => {
        if (stateAuthor) setAuthor(stateAuthor);

        if (!stateAuthor) {
            (async () => {
                try {
                    const oneById = await authorService.getOneById(Number(id));

                    if (oneById.status === HttpStatusEnum.OK) {
                        setAuthor(oneById.data);
                    }
                } catch (e) {
                    if (e) console.error(e);
                }
            })();
        }
    }, [state]);

    return (
        <div className={css.edit__author_page}>
            { author && <EditAuthorForm author={author} /> }
        </div>
    );
};
