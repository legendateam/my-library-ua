import { useContext } from 'react';

import { ColorModeContext } from '../hoc';

export const useColorMode = () => useContext(ColorModeContext);
