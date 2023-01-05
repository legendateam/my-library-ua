import React, { FC, useState } from 'react';
import Box from '@mui/material/Box';
import LogoutIcon from '@mui/icons-material/Logout';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';

import css from './Profile.module.css';
import avatar from '../../../assets/images/avatar.png';
import { ProfileListButtonConstant, routePathConstant } from '../../../constants';
import { removeTokenPairThunk, removeUser } from '../../../store';
import { RoleEnum, ThemeModeEnum } from '../../../enums';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import ListButton from './ListButton/ListButton';
import Genres from '../nav/Genres/Genres';

const Profile: FC = () => {
    const { user } = useAppSelector((state) => state.userReducer);
    const { tokenPair, responseError } = useAppSelector((state) => state.authReducer);
    const { palette: { mode } } = useTheme();

    const dispatch = useAppDispatch();

    const [open, setOpen] = useState(false);

    const handleList = () => (open ? setOpen(false) : setOpen(true));

    const data = [
        { icon: <FavoriteIcon />, label: ProfileListButtonConstant.favorite, path: routePathConstant.favoritesPage },
        { icon: <StarOutlinedIcon />, label: ProfileListButtonConstant.willRead, path: routePathConstant.willReadsPage },
        { icon: <InventoryOutlinedIcon />, label: ProfileListButtonConstant.alreadyRead, path: routePathConstant.alreadyReadsPage },
        { icon: <SettingsIcon />, label: ProfileListButtonConstant.settings, path: routePathConstant.settingsPage },
    ];

    const mobileData = [
        { icon: '', label: ProfileListButtonConstant.mobileHome, path: routePathConstant.logoutPage },
        { icon: '', label: ProfileListButtonConstant.mobileGenres, path: '' },
        { icon: '', label: ProfileListButtonConstant.mobilePopular, path: routePathConstant.ratings },
        { icon: '', label: ProfileListButtonConstant.mobileNovelty, path: routePathConstant.novelty },
        { icon: '', label: ProfileListButtonConstant.mobileAuthors, path: routePathConstant.authors },
    ];

    const logoutHandler = () => {
        handleList();
        dispatch(removeTokenPairThunk({ accessToken: tokenPair.access, clientKey: tokenPair.clientKey }));
        dispatch(removeUser());
    };

    return (
        <div className={css.header__profile}>
            <button onClick={handleList} type='button'>
                <p className={css.header__profile_nickname}>{user.nickName}</p>
                <img src={user.avatar ? user.avatar : avatar} className={css.header__profile_avatar} alt={user.nickName} />
            </button>
            {
                open && (
                    <div className={mode === ThemeModeEnum.LIGHT ? css.header__profile_list
                        : css.header__profile_list_dark}
                    >
                        <Paper elevation={0} sx={{ maxWidth: 256 }}>
                            <Box
                                sx={{
                                    pb: open ? 2 : 0,
                                    pt: open ? 2 : 0,
                                }}
                            >
                                <div className={css.header__mobile}>
                                    {
                                        mobileData.map((item) => (
                                            item.label === ProfileListButtonConstant.mobileGenres ? (
                                                <ListItemButton
                                                    sx={{
                                                        py: 0, minHeight: 32, color: 'rgba(255,255,255,.8)',
                                                    }}
                                                >
                                                    <ListItemIcon sx={{ color: 'inherit' }} />
                                                    <div className={mode === ThemeModeEnum.LIGHT ? css.header__mobile_genres
                                                        : css.header__mobile_genres_dark}>
                                                        <Genres />
                                                    </div>
                                                </ListItemButton>
                                            )
                                                : (
                                                    <ListButton key={item.label} item={item} handleList={handleList} />
                                                )
                                        ))
                                    }
                                </div>
                                {open && data.map((item) => <ListButton key={item.label} item={item} handleList={handleList} />)}
                                { user.role === RoleEnum.ADMIN && (
                                    <ListButton
                                        item={{
                                            icon: <AdminPanelSettingsOutlinedIcon />,
                                            label: ProfileListButtonConstant.adminPanel,
                                            path: routePathConstant.admin,
                                        }}
                                        handleList={handleList}
                                    />
                                ) }

                                { user.role === RoleEnum.ADMIN && (
                                    <ListButton
                                        item={{
                                            icon: <AssessmentOutlinedIcon />,
                                            label: ProfileListButtonConstant.analytics,
                                            path: routePathConstant.adminAnalytics,
                                        }}
                                        handleList={handleList}
                                    />
                                ) }

                                <ListItemButton
                                    key={ProfileListButtonConstant.logout}
                                    sx={{
                                        py: 0, minHeight: 32, color: 'rgba(255,255,255,.8)',
                                    }}
                                    onClick={logoutHandler}
                                >
                                    <ListItemIcon sx={{ color: 'inherit' }}>
                                        <LogoutIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={ProfileListButtonConstant.logout}
                                        primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                                    />
                                </ListItemButton>
                            </Box>
                        </Paper>
                    </div>
                )
            }
        </div>
    );
};

export default Profile;
