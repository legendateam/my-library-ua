import React from 'react';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';

import { useColorMode } from '../../../hooks';
import { ThemeModeEnum } from '../../../enums';

const ToggleColorMode = () => {
    const theme = useTheme();
    const colorMode = useColorMode();
    return (
        <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color='inherit'>
            {theme.palette.mode === ThemeModeEnum.DARK ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
    );
};

export default ToggleColorMode;
