import axios from 'axios';

import { mainConfig } from '../configs';

const baseURL = mainConfig.SERVER_URL;

export const axiosInstance = axios.create({ baseURL });
