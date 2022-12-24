import React, { FC, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { DocumentViewer } from 'react-documents';
import { Box, LinearProgress } from '@mui/material';

import css from './ReadTextFilePate.module.css';
import { IParamsId, IReadState } from '../../interfaces';
import { bookService } from '../../services';
import { mainConfig } from '../../configs';
import { useEffectOnce } from '../../hooks';

export const ReadTextFilePage: FC = () => {
    const { state } = useLocation();
    const { id } = useParams() as IParamsId;

    const [data, setData] = useState<IReadState>({ fileLink: '', overrideLocalhost: '', queryParams: '' });

    useEffectOnce(() => {
        if (state) {
            const { fileLink, queryParams, overrideLocalhost } = state as IReadState;
            if (fileLink && overrideLocalhost) {
                setData({ fileLink, overrideLocalhost, queryParams });
                return;
            }

            (async () => {
                const book = await bookService.getOneById(id);

                if (book?.data) {
                    setData({
                        fileLink: `${mainConfig.CLOUD_DOMAIN_NAME_FOR_FILES}${book.data.fileText}`,
                        queryParams: 'hl=UA',
                        overrideLocalhost: mainConfig.CLOUD_DOMAIN_NAME_FOR_FILES,
                    });
                }
            })();
        }
    });

    return (
        <div className={css.read__text_file_path}>
            { data.fileLink ? (
                <DocumentViewer
                    queryParams={data.queryParams}
                    url={data.fileLink}
                    overrideLocalhost={data.overrideLocalhost}
                />
            ) : (
                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>
            ) }
        </div>
    );
};
