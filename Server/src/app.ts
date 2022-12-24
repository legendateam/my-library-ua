import express from 'express';
import cors from 'cors';
import expressSession from 'express-session';
import passport from 'passport';

import { mainConfig, AppDataSource } from './configs';
import { apiRouter } from './routes';
import './configs/authSocialNetwork/passport';

const app = express();

app.use(expressSession({
    secret: mainConfig.SECRET_EXPRESS_SESSION,
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: undefined,
    },
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin: `${mainConfig.CLIENT_URL}`,
    methods: 'GET,POST,PUT,PATCH,DELETE',
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiRouter);

const { PORT } = mainConfig;

app.listen(PORT, async () => {
    console.log(`Server is running on PORT:${PORT}!`);
    try {
        const connection = await AppDataSource.initialize();
        if (connection) {
            console.log('Data Base has been connected!');
        }
    } catch (e) {
        console.error('Error connection to Data Base', e);
    }
});
