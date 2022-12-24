import React, { FC, useState } from 'react';
import { AxiosError } from 'axios';

import css from './LikesAndDisLikes.module.css';
import DisLikes from '../DisLikes/DisLikes';
import Likes from '../Likes/Likes';
import { ILikesAndDisLikesProps, IResponseError } from '../../../../interfaces';
import { likesAndDisLikesService } from '../../../../services';
import { useEffectOnce } from '../../../../hooks';
import { HttpStatusEnum } from '../../../../enums';
import { ILikesResponse } from '../../../../interfaces/response/likes.response.interface';

export const LikesAndDisLikes: FC<ILikesAndDisLikesProps> = ({ commentId }) => {
    const [actions, setActions] = useState<ILikesResponse[] | null>(null);
    const [putLike, setPutLike] = useState<boolean>(false);
    const [putDisLike, setPutDisLike] = useState<boolean>(false);

    const [likes, setLikes] = useState<number>(0);
    const [disLikes, setDisLikes] = useState<number>(0);

    useEffectOnce(() => {
        (async () => {
            try {
                const commentLikes = await likesAndDisLikesService.getAll(commentId);
                if (commentLikes.status === HttpStatusEnum.OK) {
                    setActions(commentLikes.data);
                }
            } catch (e) {
                console.error((e as AxiosError).response.data);
            }
        })();
    });

    return (
        <div className={css.likesAndDisLikes}>
            <Likes
                actions={actions}
                putLike={putLike}
                setPutLike={setPutLike}
                putDisLike={putDisLike}
                setPutDisLike={setPutDisLike}
                commentId={commentId}
                likes={likes}
                setDisLikes={setDisLikes}
                setLikes={setLikes}
                disLikes={disLikes}
            />
            <DisLikes
                likes={likes}
                actions={actions}
                putDisLike={putDisLike}
                putLike={putLike}
                setPutLike={setPutLike}
                setPutDisLike={setPutDisLike}
                commentId={commentId}
                setDisLikes={setDisLikes}
                setLikes={setLikes}
                disLikes={disLikes}
            />
        </div>
    );
};
