import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Layout } from './components';
import {
    AdminPage,
    AlreadyReadPage, AnalyticsPage,
    AuthorSinglePage,
    AuthorsPage,
    BooksGenresPage,
    BookSinglePage,
    BooksRatingsPage,
    EditAuthorPage,
    EditBookPage,
    FavoritesPage,
    ForgotPasswordPage,
    HomePage,
    NotFoundPage,
    NoveltyPage,
    ReadTextFilePage,
    SearchPage,
    SettingsPage,
    WillReadPage,
} from './pages';
import { BlurModeProvider, ColorModeProvider } from './hoc';
import { useAppSelector } from './hooks';
import { routePathConstant } from './constants';
import { RoleEnum } from './enums';

const App = () => {
    const { user } = useAppSelector((state) => state.userReducer);

    return (
        <ColorModeProvider>
            <BlurModeProvider>
                <Routes>
                    <Route path='/' element={<Layout />}>
                        <Route index element={<HomePage />} />
                        <Route path={routePathConstant.authors} element={<AuthorsPage />} />
                        <Route path={routePathConstant.novelty} element={<NoveltyPage />} />
                        <Route path={routePathConstant.ratings} element={<BooksRatingsPage />} />
                        <Route path={routePathConstant.authorSinglePage} element={<AuthorSinglePage />} />
                        <Route path={routePathConstant.bookSinglePage} element={<BookSinglePage />} />
                        <Route path={routePathConstant.readTextFilePage} element={<ReadTextFilePage />} />
                        <Route path={routePathConstant.genresPage} element={<BooksGenresPage />} />
                        <Route path={routePathConstant.search} element={<SearchPage />} />
                        <Route path={routePathConstant.forgotPassword} element={<ForgotPasswordPage />} />
                        { user && <Route path={routePathConstant.alreadyReadsPage} element={<AlreadyReadPage />} /> }
                        { user && <Route path={routePathConstant.favoritesPage} element={<FavoritesPage />} /> }
                        { user && <Route path={routePathConstant.willReadsPage} element={<WillReadPage />} /> }
                        { user && <Route path={routePathConstant.settingsPage} element={<SettingsPage />} /> }
                        { (user && user.role === RoleEnum.ADMIN) && <Route path={routePathConstant.admin} element={<AdminPage />} /> }
                        { (user && user.role === RoleEnum.ADMIN) && (
                            <Route
                                path={routePathConstant.adminBookEdit}
                                element={<EditBookPage />}
                            />
                        ) }
                        { (user && user.role === RoleEnum.ADMIN) && (
                            <Route
                                path={routePathConstant.adminAuthorEdit}
                                element={<EditAuthorPage />}
                            />
                        ) }
                        {
                            (user && user.role === RoleEnum.ADMIN) && (
                                <Route
                                    path={routePathConstant.adminAnalytics}
                                    element={<AnalyticsPage />}
                                />
                            )
                        }
                        <Route path='*' element={<NotFoundPage />} />
                    </Route>
                </Routes>
            </BlurModeProvider>
        </ColorModeProvider>
    );
};

export default App;
