import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import { configs, AppDataSource } from './configs';
import { apiRouters } from './routes';
import { cronStart } from './cron';

const app = express();

const corsOptions = {
    origin: `${configs.CLIENT_URL}`,
    methods: 'GET,POST,PUT,PATCH,DELETE',
    credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiRouters);

const main = async (): Promise<void> => {
    app.listen(configs.PORT, () => {
        console.log(`Analytics Server is running on PORT:${configs.PORT}`);
    });

    await AppDataSource.initialize().then(() => console.log('Data Base has ben connected!')).catch((err) => console.error(err));

    await mongoose.connect(configs.DB_URI).then(() => {
        console.log('Data Base for analytics has been connected!');
    }).catch((err) => console.error(err));
};

main().then(() => cronStart()).catch((err) => console.error(err));
