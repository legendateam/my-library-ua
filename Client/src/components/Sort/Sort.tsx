import React, { FC, useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { SortEnum } from '../../enums';
import {
    queryConstant, sortConstant, urls,
} from '../../constants';

const Sort: FC = () => {
    const [sortBy, setSortBy] = useState<SortEnum | string>('');

    const { pathname } = useLocation();
    const [query, setQuery] = useSearchParams();

    const handleChange = (event: SelectChangeEvent) => {
        setSortBy(event.target.value as SortEnum);

        setQuery([...query.entries(), [queryConstant.sortBy, event.target.value]]);
    };

    useEffect(() => {
        if ((query.get(queryConstant.sortBy) === sortConstant.views || query.get(queryConstant.sortBy) === sortConstant.rating
            || query.get(queryConstant.sortBy) === sortConstant.date) && !sortBy) {
            setSortBy(query.get(queryConstant.sortBy));
        }
    }, [query]);

    return (
        <Box sx={{ width: 160 }}>
            <FormControl sx={{ width: 160 }} size='small'>
                <InputLabel id='demo-simple-select-label'>Сортування по:</InputLabel>
                <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={sortBy}
                    label='Сортування по:'
                    onChange={handleChange}
                >
                    <MenuItem value='Date'>Даті</MenuItem>
                    { (pathname !== urls.ratings) && <MenuItem value='Rating'>Рейтингу</MenuItem> }
                    <MenuItem value='Views'>Переглядам</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};

export default Sort;
