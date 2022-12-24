import axios from 'axios';

import { mainConfig } from '../configs';

const baseURL = mainConfig.ANALYTICS_URL;

export const axiosAnalyticsInstance = axios.create({ baseURL });
