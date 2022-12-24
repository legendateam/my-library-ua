import { ReactNode } from 'react';

export interface IProfileListButtonProps {
    item: {
        icon: ReactNode,
        label: string,
        path: string,
    },
    handleList: () => void,
}
