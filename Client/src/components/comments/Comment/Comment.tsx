import React, { FC } from 'react';

import css from './Comment.module.css';
import avatar from '../../../assets/images/avatar.png';
import { ICommentProps } from '../../../interfaces';
import { mainConfig } from '../../../configs';
import { datesNormalize } from '../../../utils';
import { LikesAndDisLikes } from '../../actions/likes/LikesAndDisLikes/LikesAndDisLikes';

const Comment: FC<ICommentProps> = ({
    comment: {
        text, id, user: { nickName, avatar: userAvatar }, createdAt,
    },
}) => (
    <li className={css.comment}>
        <div className={css.comment__user}>
            <img
                className={css.comment__avatar}
                src={userAvatar ? `${mainConfig.CLOUD_DOMAIN_NAME}${userAvatar}`
                    : avatar}
                alt={nickName}
            />
            <h4>{nickName}</h4>
            <p>{datesNormalize(createdAt.substring(0, 10), null)}</p>
        </div>

        <div className={css.comment__text}>
            <p>{text}</p>
        </div>

        <LikesAndDisLikes commentId={id} />
    </li>
);

export default Comment;
