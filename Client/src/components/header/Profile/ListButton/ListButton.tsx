import React, { FC } from 'react';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import { Link } from 'react-router-dom';

import { IProfileListButtonProps } from '../../../../interfaces';

const ListButton:FC<IProfileListButtonProps> = ({ item: { icon, label, path }, handleList }: IProfileListButtonProps) => (
    <Link to={path}>
        <ListItemButton
            key={label}
            sx={{
                py: 0, minHeight: 32, color: 'rgba(255,255,255,.8)',
            }}
            onClick={handleList}
        >
            <ListItemIcon sx={{ color: 'inherit' }}>
                {icon}
            </ListItemIcon>
            <ListItemText
                primary={label}
                primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
            />
        </ListItemButton>
    </Link>
);

export default ListButton;
