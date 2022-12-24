import React, { FC, useEffect, useState } from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Link } from 'react-router-dom';

import css from './Update.module.css';
import { IUpdateProps } from '../../../../interfaces';
import { deleteConstant, routePathConstant } from '../../../../constants';

export const Update: FC<IUpdateProps> = ({ type, book, author }) => {
    const [check, setCheck] = useState<boolean>(false);
    const [path, setPath] = useState<string>('');

    useEffect(() => {
        if (type === deleteConstant.book) {
            setPath(`${routePathConstant.adminBookEditWithoutId}/${book.id}`);
        }

        if (type === deleteConstant.author) {
            setPath(`${routePathConstant.adminAuthorEditWithoutId}/${author.id}`);
        }
    }, [type]);

    return (
        <Link className={css.update__link_book} to={path} state={book ?? author}>
            <div className={css.update__book} onMouseEnter={() => setCheck(true)} onMouseLeave={() => setCheck(false)}>
                { !check && <EditOutlinedIcon />}
                { check && <ModeEditIcon />}
            </div>
        </Link>
    );
};
