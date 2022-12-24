// Imports the Google Cloud client library
import { Bucket, Storage } from '@google-cloud/storage';
import path from 'path';

import { mainConfig } from '../configs';

class GoogleCloudService {
    // Creates a client using Application Default Credentials
    storage;

    // The ID of your GCS bucket
    // const bucketName = 'your-unique-bucket-name';
    bucketName;

    // domain google cloud name
    googleCloudName;

    constructor() {
        // Creates a client from a Google service account key
        // const storage = new Storage({keyFilename: 'key.json'});

        this.storage = new Storage({
            projectId: mainConfig.GOOGLE_CLOUD_PROJECT_ID!,
            keyFilename: path.join(process.cwd(), mainConfig.GOOGLE_KEY_FILE_NAME!),
        });

        this.bucketName = mainConfig.GOOGLE_CLOUD_BUCKET_NAME;
        this.googleCloudName = mainConfig?.GOOGLE_CLOUD_DOMAIN_NAME;
    }

    public upload(file: Express.Multer.File, bookName: string): undefined | string {
        const fileName = this._nameBuilder(file.originalname, bookName);
        const fileBucket = this._bucket()?.file(fileName);

        const writeStream = fileBucket?.createWriteStream();
        writeStream?.end(file.buffer);

        return this._pathBuilder(fileName);
    }

    public async deleteOne(fileName: string): Promise<void> {
        await this._bucket()?.file(fileName).delete();
    }

    private _bucket(): Bucket | undefined {
        if (this.bucketName) {
            return this.storage.bucket(this.bucketName);
        }
    }

    private _pathBuilder(originalName: string): string {
        return `/${this.bucketName}/${originalName}`;
    }

    private _nameBuilder(originalFileName: string, bookName: string): string {
        const format = path.extname(originalFileName);
        return `${bookName}${format}`;
    }
}

export const googleCloudService = new GoogleCloudService();
