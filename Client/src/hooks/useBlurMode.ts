import { useContext } from 'react';

import { AuthFormContext } from '../hoc';

export const useBlurMode = () => useContext(AuthFormContext);
