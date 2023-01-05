import React, { FC, useState } from 'react';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

import css from './Views.module.css';
import { IResponseOK, IViewForBook, IViews } from '../../interfaces';
import { viewService } from '../../services';
import { useEffectOnce } from '../../hooks';
import { HttpStatusEnum } from '../../enums';

export const Views: FC<IViewForBook> = ({ bookId, newView }) => {
    const [views, setViews] = useState<number | null>(null);

    useEffectOnce(() => {
        if (!views) {
            (async () => {
                try {
                    const getView = await viewService.getView({ bookId }) as IResponseOK<string>;

                    if (getView.status === HttpStatusEnum.OK) {
                        const { views } = JSON.parse(getView.data) as IViews;

                        if (newView) {
                            setViews(views + 1);
                            await viewService.updateView({ bookId });
                            return;
                        }

                        setViews(views);
                        return;
                    }
                } catch (e) {
                    console.error((e as Error).message);
                }

                try {
                    const view = await viewService.setView({ bookId }) as IResponseOK<string>;

                    if (view.status === HttpStatusEnum.CREATED) {
                        setViews(0);
                    }
                } catch (e) {
                    console.error((e as Error).message);
                }
            })();
        }
    });

    return (
        <div className={css.views__book}>
            <VisibilityOutlinedIcon /> <span>{views}</span>
        </div>
    );
};
