import React, {
    FC, useState,
} from 'react';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

import css from './Genres.module.css';
import Genre from '../../../Genre/Genre';
import { IGenreResponse } from '../../../../interfaces';
import { genreService } from '../../../../services';

const Genres:FC = () => {
    const [genres, setGenres] = useState<IGenreResponse[]>([]);

    const [triggerGenres, setTriggerGenres] = useState<boolean>(false);
    const [triggerGenre, setTriggerGenre] = useState<boolean>(false);

    const getGenres = async () => {
        setTriggerGenre(false);

        if (!genres.length) {
            const { data } = await genreService.getAll();

            setGenres(data);
        }

        !triggerGenres ? setTriggerGenres(true) : setTriggerGenres(false);
    };

    const handleGenre = (): void => {
        setTriggerGenre(true);
        setTriggerGenres(false);
    };

    return (
        <div className={css.header__nav_genres}>
            <div>
                <Button onClick={getGenres} variant='text' color='inherit'>
                    Жанри
                </Button>
                {
                    (!!genres.length && !triggerGenre && triggerGenres) && (
                        <div className={css.header__nav_genres_position}>
                            <Box sx={{
                                bgcolor: 'background.default',
                                color: 'text.primary',
                            }}
                            >
                                <div className={css.header__nav_genres_typography}>
                                    {
                                        genres.map((genre) => (
                                            <Genre
                                                key={genre.id}
                                                genre={genre}
                                                handleGenre={handleGenre}
                                            />
                                        ))
                                    }
                                </div>
                            </Box>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Genres;
