import React, { FC } from 'react';
import { Button } from '@mui/material';
import { AxiosError } from 'axios';

import { IDownloadProps, IResponseError } from '../../interfaces';
import { HttpStatusEnum } from '../../enums';
import { analyticsService } from '../../services';

export const Download: FC<IDownloadProps> = ({ fileLink, fileName }: IDownloadProps) => {
    const handleBtnForAnalytics = async () => {
        try {
            await analyticsService.createFirstFilesToDay({ downloadNumbers: true, readNumbers: false });
        } catch (e) {
            const axiosError = (e as AxiosError)?.response?.data;
            const errorResponse = axiosError as IResponseError;

            if (errorResponse.status === HttpStatusEnum.CONFLICT) {
                await analyticsService.updateFilesToDay({ downloadNumbers: true, readNumbers: false });
            }
        }
    };

    return (
        <Button onClick={handleBtnForAnalytics} variant='contained' href={fileLink}>
            Скачати книгу {fileName}
        </Button>
    );
};
