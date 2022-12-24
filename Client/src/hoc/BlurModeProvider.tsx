import React, {
    createContext, FC, ReactNode, useMemo, useState,
} from 'react';

import { IHandleBlur } from '../interfaces';

type Props = {
    children: ReactNode;
};

export const AuthFormContext = createContext<IHandleBlur>({ handleBlurToggle: () => {}, triggerBlur: false });

export const BlurModeProvider: FC<Props> = ({ children }: Props) => {
    const [trigger, setTrigger] = useState(false);

    const handleBlurToggle = useMemo<IHandleBlur>(() => ({
        handleBlurToggle: () => {
            trigger ? setTrigger(false) : setTrigger(true);
        },
        triggerBlur: trigger,
    }), [trigger]);

    return (
        <AuthFormContext.Provider value={handleBlurToggle}>
            { children }
        </AuthFormContext.Provider>
    );
};
