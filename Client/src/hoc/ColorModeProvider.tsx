import React, {
    createContext, FC, useMemo, useState, ReactNode,
} from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ThemeModeEnum } from '../enums';

type Props = {
    children: ReactNode;
};

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const ColorModeProvider: FC<Props> = ({ children }: Props) => {
    const [mode, setMode] = useState<ThemeModeEnum>(ThemeModeEnum.LIGHT);
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === ThemeModeEnum.LIGHT ? ThemeModeEnum.DARK : ThemeModeEnum.LIGHT));
            },
        }),
        [mode],
    );
    const theme = useMemo(
        () => createTheme({
            palette: {
                mode,
            },
        }),
        [mode],
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};
