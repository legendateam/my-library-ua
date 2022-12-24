import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import style from './Author.module.css';
import { IAuthorProps } from '../../interfaces';
import { mainConfig } from '../../configs';
import { datesNormalize } from '../../utils';
import { deleteConstant, routePathConstant } from '../../constants';
import { RoleEnum } from '../../enums';
import { useAppSelector } from '../../hooks';
import { Update } from '../admin/icons/Update/Update';
import { Delete } from '../admin/icons/Delete/Delete';

export const Author: FC<IAuthorProps> = ({ author }) => {
    const { user } = useAppSelector((state) => state.userReducer);

    const img = `${mainConfig.CLOUD_DOMAIN_NAME}${author?.photo}`;
    const fullName = `${author.firstName} ${author.lastName}`;

    const datesAuthor = datesNormalize(author.dateBirthday, author.dateDeath);

    return (
        <div className={style.author__container}>
            { (user && user?.role === RoleEnum.ADMIN) && (
                <div className={style.author__container_admin_icons}>
                    <Update author={author} type={deleteConstant.author} />
                    <Delete type={deleteConstant.author} authorId={author.id} />
                </div>
            ) }
            <Link className={style.author__container_link} to={`/${routePathConstant.authors}/${author.id}`} state={author}>
                <div className={style.author}>
                    { author?.photo && <img className={style.author__img} src={img} alt={author.firstName} /> }
                    <div className={style.author__info}>
                        <h4>{fullName}</h4>
                        <h6>{datesAuthor && datesAuthor}</h6>
                    </div>
                </div>
            </Link>
        </div>
    );
};
