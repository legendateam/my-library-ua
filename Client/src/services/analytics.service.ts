import { axiosAnalyticsInstance } from './axiosAnalyticsInstance.service';
import { mainConfig } from '../configs';
import { queryConstant, urls } from '../constants';
import {
    IFilesAnalytics, IFilesModel, IResponseOK, IViewsModel,
} from '../interfaces';

class AnalyticsService {
    public async createFirstViewToDay(userId?: number): Promise<IResponseOK<IViewsModel>> {
        if (!userId) {
            return axiosAnalyticsInstance.post(`${mainConfig.ANALYTICS_URL}${urls.views}`).then(({ data }) => data);
        }
        return axiosAnalyticsInstance.post(`${mainConfig.ANALYTICS_URL}${urls.views}`, { id: userId }).then(({ data }) => data);
    }

    public async updateViewsToDay(userId?: number): Promise<IResponseOK<IViewsModel>> {
        if (!userId) {
            return axiosAnalyticsInstance.patch(`${mainConfig.ANALYTICS_URL}${urls.views}`).then(({ data }) => data);
        }
        return axiosAnalyticsInstance.patch(`${mainConfig.ANALYTICS_URL}${urls.views}`, { id: userId }).then(({ data }) => data);
    }

    public async getAll(queryDate?: string): Promise<IResponseOK<IViewsModel[]>> {
        if (!queryDate) return axiosAnalyticsInstance.get(`${mainConfig.ANALYTICS_URL}${urls.views}`).then(({ data }) => data);
        return axiosAnalyticsInstance.get(`${mainConfig.ANALYTICS_URL}${urls.views}?${queryConstant.date}=${queryDate}`)
            .then(({ data }) => data);
    }

    public async getOneByDate(date?: string): Promise<IResponseOK<IViewsModel>> {
        return axiosAnalyticsInstance.get(`${mainConfig.ANALYTICS_URL}${urls.views}/${date}`).then(({ data }) => data);
    }

    public async createFirstFilesToDay(files: IFilesAnalytics): Promise<IResponseOK<IFilesModel>> {
        return axiosAnalyticsInstance.post(`${mainConfig.ANALYTICS_URL}${urls.files}`, { ...files })
            .then(({ data }) => data);
    }

    public async updateFilesToDay(files: IFilesAnalytics): Promise<IResponseOK<IFilesModel>> {
        return axiosAnalyticsInstance.patch(`${mainConfig.ANALYTICS_URL}${urls.files}`, { ...files })
            .then(({ data }) => data);
    }

    public async getAllFiles(queryDate?: string): Promise<IResponseOK<IFilesModel[]>> {
        if (!queryDate) return axiosAnalyticsInstance.get(`${mainConfig.ANALYTICS_URL}${urls.files}`).then(({ data }) => data);
        return axiosAnalyticsInstance.get(`${mainConfig.ANALYTICS_URL}${urls.files}?${queryConstant.date}=${queryDate}`)
            .then(({ data }) => data);
    }

    public async getOneFilesByDate(date?: string): Promise<IResponseOK<IFilesModel>> {
        return axiosAnalyticsInstance.get(`${mainConfig.ANALYTICS_URL}${urls.files}/${date}`).then(({ data }) => data);
    }

    public async getCountNewUsersByDate(date?: string): Promise<IResponseOK<number>> {
        return axiosAnalyticsInstance.get(`${mainConfig.ANALYTICS_URL}${urls.users}/${date}`).then(({ data }) => data);
    }

    public async getAllCountUsers(): Promise<IResponseOK<number>> {
        return axiosAnalyticsInstance.get(`${mainConfig.ANALYTICS_URL}${urls.users}`).then(({ data }) => data);
    }
}

export const analyticsService = new AnalyticsService();
