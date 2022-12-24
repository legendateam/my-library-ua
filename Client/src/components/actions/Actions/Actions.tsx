import React, { FC } from 'react';

import style from './Actions.module.css';
import { IBookProps } from '../../../interfaces';
import AlreadyRead from '../AlreadyRead/AlreadyRead';
import Favorites from '../Favorites/Favorites';
import WillRead from '../WillRead/WillRead';

export const Actions: FC<IBookProps> = ({ book }) => (
    <div className={style.actions}>
        <AlreadyRead book={book} />
        <Favorites book={book} />
        <WillRead book={book} />
    </div>
);
