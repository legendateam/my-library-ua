import React, { FC, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import css from './Title.module.css';
import { ITitleProps } from '../../interfaces';
import { ThemeModeEnum } from '../../enums';

export const Title: FC<ITitleProps> = ({ title }) => {
    const theme = useTheme();

    const [themeMode, setThemeMode] = useState<string>(css.title);

    useEffect(() => {
        theme.palette.mode === ThemeModeEnum.DARK ? setThemeMode(css.title_genre_dark)
            : setThemeMode(css.title);
    }, [theme.palette.mode]);

    return (
        <Box
            className={themeMode}
            sx={{
                color: 'text.primary',
                height: 50,
            }}
        >
            <p>{title}</p>
        </Box>
    );
};
