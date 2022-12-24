import React from 'react';

import { ILikesResponse } from '../response/likes.response.interface';

export interface ILikesProps {
    actions: ILikesResponse[],
    commentId: number,
    putLike: boolean,
    setPutLike: React.Dispatch<React.SetStateAction<boolean>>,
    setPutDisLike: React.Dispatch<React.SetStateAction<boolean>>,
    putDisLike: boolean,
    likes: number,
    setLikes: React.Dispatch<React.SetStateAction<number>>,
    setDisLikes: React.Dispatch<React.SetStateAction<number>>,
    disLikes: number,
}
