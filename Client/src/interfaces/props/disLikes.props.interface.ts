import React from 'react';

import { ILikesResponse } from '../response/likes.response.interface';

export interface IDisLikesProps {
    actions: ILikesResponse[],
    commentId: number,
    putDisLike: boolean,
    putLike: boolean,
    setPutLike: React.Dispatch<React.SetStateAction<boolean>>,
    setPutDisLike: React.Dispatch<React.SetStateAction<boolean>>,
    disLikes: number,
    setLikes: React.Dispatch<React.SetStateAction<number>>,
    setDisLikes: React.Dispatch<React.SetStateAction<number>>,
    likes: number,
}
