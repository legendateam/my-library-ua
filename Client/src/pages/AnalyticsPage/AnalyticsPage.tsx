import React, { FC, useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { AxiosError } from 'axios';

import css from './AnalyticsPage.module.css';
import { useAppDispatch, useAppSelector, useEffectOnce } from '../../hooks';
import { analyticsService, authService } from '../../services';
import { IAnalyticViews, IFilesModel, IResponseError } from '../../interfaces';
import { HttpStatusEnum } from '../../enums';
import { Title } from '../../components';
import { generalMessageConstant } from '../../constants';
import Analytics from '../../components/admin/Analytics/Analytics';
import { removeTokenPair, removeUser } from '../../store';

dayjs.extend(utc);

export const AnalyticsPage: FC = () => {
    const { tokenPair: { clientKey, refresh } } = useAppSelector((state) => state.authReducer);
    const dispatch = useAppDispatch();

    useEffectOnce(() => {
        (async () => {
            try {
                await authService.checkRefreshOnJwtExpired({ clientKey, refreshToken: refresh });
            } catch (e) {
                const axiosError = (e as AxiosError)?.response?.data;
                const responseError = axiosError as IResponseError;

                if (responseError.status === HttpStatusEnum.UNAUTHORIZED) {
                    dispatch(removeUser());
                    dispatch(removeTokenPair());
                }
            }
        })();
    });

    const [allViews, setAllViews] = useState<IAnalyticViews | null>(null);
    const [allFiles, setAllFiles] = useState<IFilesModel | null>(null);
    const [allCountUsers, setAllCountUsers] = useState<number>(0);

    useEffectOnce(() => {
        (async () => {
            try {
                const allViews = await analyticsService.getAll();

                if (allViews.status === HttpStatusEnum.OK) {
                    let statisticsAll = { unique_views: 0, auth_views: 0, views: 0 } as IAnalyticViews;

                    const statistics = new Promise(((resolve) => {
                        resolve(true);
                    }));

                    statistics.then(() => {
                        allViews.data.forEach((views) => {
                            statisticsAll = {
                                unique_views: statisticsAll.unique_views + views.unique_views,
                                views: statisticsAll.views + views.views,
                                auth_views: statisticsAll.auth_views + views.auth_views,
                            };
                        });
                    }).then(() => {
                        setAllViews(statisticsAll);
                    });
                }
            } catch (e) {
                console.error(e);
            }
        })();

        (async () => {
            try {
                const allFiles = await analyticsService.getAllFiles();

                if (allFiles.status === HttpStatusEnum.OK) {
                    let statisticsAll = { readNumbers: 0, downloadNumbers: 0 } as IFilesModel;

                    const statistics = new Promise(((resolve) => {
                        resolve(true);
                    }));

                    statistics.then(() => {
                        allFiles.data.forEach((files) => {
                            statisticsAll = {
                                readNumbers: statisticsAll.readNumbers + files.readNumbers,
                                downloadNumbers: statisticsAll.downloadNumbers + files.downloadNumbers,
                            };
                        });
                    }).then(() => {
                        setAllFiles(statisticsAll);
                    });
                }
            } catch (e) {
                console.error(e);
            }
        })();

        (async () => {
            try {
                const countNewUsers = await analyticsService.getAllCountUsers();

                if (countNewUsers.status === HttpStatusEnum.OK) {
                    setAllCountUsers(countNewUsers.data);
                }
            } catch (e) {
                console.error(e);
            }
        })();
    });
    // -------------------------------- toDay
    const toDay = dayjs().utc().startOf('day').format();

    const [dayViews, setDayViews] = useState<IAnalyticViews | null>(null);
    const [dayFiles, setDayFiles] = useState<IFilesModel | null>(null);
    const [allCountUsersDay, setAllCountUsersDay] = useState<number>(0);

    useEffectOnce(() => {
        (async () => {
            try {
                const viewsToDay = await analyticsService.getOneByDate(toDay);

                if (viewsToDay.status === HttpStatusEnum.OK) setDayViews(viewsToDay.data);
            } catch (e) {
                console.error(e);
            }
        })();

        (async () => {
            try {
                const filesToDay = await analyticsService.getOneFilesByDate(toDay);

                if (filesToDay.status === HttpStatusEnum.OK) setDayFiles(filesToDay.data);
            } catch (e) {
                console.error(e);
            }
        })();

        (async () => {
            try {
                const countNewUsers = await analyticsService.getCountNewUsersByDate(toDay);

                if (countNewUsers.status === HttpStatusEnum.OK) {
                    setAllCountUsersDay(countNewUsers.data);
                }
            } catch (e) {
                console.error(e);
            }
        })();
    });
    // ------------------------week
    const toWeek = dayjs().utc().startOf('week').add(1, 'day')
        .format();

    const [weekViews, setWeekViews] = useState<IAnalyticViews | null>(null);
    const [weekFiles, setWeekFiles] = useState<IFilesModel | null>(null);
    const [allCountUsersWeek, setAllCountUsersWeek] = useState<number>(0);

    useEffectOnce(() => {
        (async () => {
            try {
                const viewsToWeek = await analyticsService.getAll(toWeek);

                if (viewsToWeek.status === HttpStatusEnum.OK) {
                    let views = { views: 0, auth_views: 0, unique_views: 0 } as IAnalyticViews;

                    const statistics = new Promise(((resolve) => {
                        resolve(true);
                    }));

                    statistics.then(() => {
                        viewsToWeek.data.forEach((view) => {
                            views = {
                                views: views.views + view.views,
                                unique_views: views.unique_views + view.unique_views,
                                auth_views: views.auth_views + view.auth_views,
                            };
                        });
                    }).then(() => setWeekViews(views));
                }
            } catch (e) {
                console.error(e);
            }
        })();

        (async () => {
            try {
                const filesToWeek = await analyticsService.getAllFiles(toWeek);

                if (filesToWeek.status === HttpStatusEnum.OK) {
                    let files = { downloadNumbers: 0, readNumbers: 0 } as IFilesModel;

                    const statistics = new Promise(((resolve) => {
                        resolve(true);
                    }));

                    statistics.then(() => {
                        filesToWeek.data.forEach((view) => {
                            files = {
                                downloadNumbers: files.downloadNumbers + view.downloadNumbers,
                                readNumbers: files.readNumbers + view.readNumbers,
                            };
                        });
                    }).then(() => setWeekFiles(files));
                }
            } catch (e) {
                console.error(e);
            }
        })();

        (async () => {
            try {
                const countNewUsers = await analyticsService.getCountNewUsersByDate(toWeek);

                if (countNewUsers.status === HttpStatusEnum.OK) {
                    setAllCountUsersWeek(countNewUsers.data);
                }
            } catch (e) {
                console.error(e);
            }
        })();
    });
    // ----------------------- month
    const toMonth = dayjs().utc().startOf('month').format();

    const [monthViews, setMonthViews] = useState<IAnalyticViews | null>(null);
    const [monthFiles, setMonthFiles] = useState<IFilesModel | null>(null);
    const [allCountUsersMonth, setAllCountUsersMonth] = useState<number>(0);

    useEffectOnce(() => {
        (async () => {
            try {
                const viewsToMonth = await analyticsService.getAll(toMonth);

                if (viewsToMonth.status === HttpStatusEnum.OK) {
                    let views = { views: 0, auth_views: 0, unique_views: 0 } as IAnalyticViews;

                    const statistics = new Promise(((resolve) => {
                        resolve(true);
                    }));

                    statistics.then(() => {
                        viewsToMonth.data.forEach((view) => {
                            views = {
                                views: views.views + view.views,
                                unique_views: views.unique_views + view.unique_views,
                                auth_views: views.auth_views + view.auth_views,
                            };
                        });
                    }).then(() => setMonthViews(views));
                }
            } catch (e) {
                console.error(e);
            }
        })();

        (async () => {
            try {
                const filesToMonth = await analyticsService.getAllFiles(toMonth);

                if (filesToMonth.status === HttpStatusEnum.OK) {
                    let files = { readNumbers: 0, downloadNumbers: 0 } as IFilesModel;

                    const statistics = new Promise(((resolve) => {
                        resolve(true);
                    }));

                    statistics.then(() => {
                        filesToMonth.data.forEach((file) => {
                            files = {
                                downloadNumbers: files.downloadNumbers + file.downloadNumbers,
                                readNumbers: files.readNumbers + file.readNumbers,
                            };
                        });
                    }).then(() => setMonthFiles(files));
                }
            } catch (e) {
                console.error(e);
            }
        })();

        (async () => {
            try {
                const countNewUsers = await analyticsService.getCountNewUsersByDate(toMonth);

                if (countNewUsers.status === HttpStatusEnum.OK) {
                    setAllCountUsersMonth(countNewUsers.data);
                }
            } catch (e) {
                console.error(e);
            }
        })();
    });

    return (
        <div className={css.analytics__page}>
            <div className={css.analytics__block}>
                <Title title={generalMessageConstant.analyticsToAll} />
                <Analytics
                    views={allViews ?? { auth_views: 0, unique_views: 0, views: 0 }}
                    files={allFiles ?? { readNumbers: 0, downloadNumbers: 0 }}
                    countUsers={allCountUsers}
                />
            </div>

            <div className={css.analytics__block}>
                <Title title={generalMessageConstant.analyticsToDay} />
                <Analytics
                    views={dayViews ?? { auth_views: 0, unique_views: 0, views: 0 }}
                    files={dayFiles ?? { readNumbers: 0, downloadNumbers: 0 }}
                    countUsers={allCountUsersDay}
                />
            </div>

            <div className={css.analytics__block}>
                <Title title={generalMessageConstant.analyticsToWeek} />
                <Analytics
                    views={weekViews ?? { auth_views: 0, unique_views: 0, views: 0 }}
                    files={weekFiles ?? { readNumbers: 0, downloadNumbers: 0 }}
                    countUsers={allCountUsersWeek}
                />
            </div>

            <div className={css.analytics__block}>
                <Title title={generalMessageConstant.analyticsToMonth} />
                <Analytics
                    views={monthViews ?? { auth_views: 0, unique_views: 0, views: 0 }}
                    files={monthFiles ?? { readNumbers: 0, downloadNumbers: 0 }}
                    countUsers={allCountUsersMonth}
                />
            </div>
        </div>
    );
};
