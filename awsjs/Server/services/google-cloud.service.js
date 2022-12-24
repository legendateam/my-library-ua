"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleCloudService = void 0;
// Imports the Google Cloud client library
const storage_1 = require("@google-cloud/storage");
const path_1 = __importDefault(require("path"));
const configs_1 = require("../configs");
class GoogleCloudService {
    constructor() {
        // Creates a client from a Google service account key
        // const storage = new Storage({keyFilename: 'key.json'});
        this.storage = new storage_1.Storage({
            projectId: configs_1.mainConfig.GOOGLE_CLOUD_PROJECT_ID,
            keyFilename: path_1.default.join(process.cwd(), configs_1.mainConfig.GOOGLE_KEY_FILE_NAME),
        });
        this.bucketName = configs_1.mainConfig.GOOGLE_CLOUD_BUCKET_NAME;
        this.googleCloudName = configs_1.mainConfig?.GOOGLE_CLOUD_DOMAIN_NAME;
    }
    upload(file, bookName) {
        const fileName = this._nameBuilder(file.originalname, bookName);
        const fileBucket = this._bucket()?.file(fileName);
        const writeStream = fileBucket?.createWriteStream();
        writeStream?.end(file.buffer);
        return this._pathBuilder(fileName);
    }
    async deleteOne(fileName) {
        await this._bucket()?.file(fileName).delete();
    }
    _bucket() {
        if (this.bucketName) {
            return this.storage.bucket(this.bucketName);
        }
    }
    _pathBuilder(originalName) {
        return `/${this.bucketName}/${originalName}`;
    }
    _nameBuilder(originalFileName, bookName) {
        const format = path_1.default.extname(originalFileName);
        return `${bookName}${format}`;
    }
}
exports.googleCloudService = new GoogleCloudService();
//# sourceMappingURL=google-cloud.service.js.map