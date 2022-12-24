"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3Service = void 0;
const s3_1 = __importDefault(require("aws-sdk/clients/s3"));
const uuid_1 = require("uuid");
const path_1 = __importDefault(require("path"));
const configs_1 = require("../configs");
class S3Service {
    constructor() {
        this.Bucket = new s3_1.default({
            region: configs_1.mainConfig.S3_REGION,
            accessKeyId: configs_1.mainConfig.S3_ACCESS_KEY,
            secretAccessKey: configs_1.mainConfig.S3_SECRET_KEY,
        });
        this.uuidv4 = uuid_1.v4;
    }
    async uploadFile(file, itemId, fileType, itemType) {
        const { originalname, buffer, mimetype } = file;
        const itemIdToString = itemId.toString();
        const pathToFile = this._pathBuilder(originalname, itemIdToString, fileType, itemType);
        return this.Bucket.upload({
            Bucket: configs_1.mainConfig.S3_NAME,
            Key: pathToFile,
            Body: buffer,
            ContentType: mimetype,
            ACL: 'public-read',
        })
            .promise();
    }
    async deleteFile(filePath) {
        /*
            where value for 'Key' equals 'pathName1/pathName2/.../pathNameN/fileName.ext'
            - full path name to your file without '/' at the beginning
        */
        const filePathSlice = filePath.slice(1);
        await this.Bucket.deleteObject({ Bucket: configs_1.mainConfig.S3_NAME, Key: filePathSlice }, (err) => {
            if (err)
                console.error(err);
        }).promise();
    }
    _pathBuilder(fileName, itemId, fileType, itemType) {
        const fileExpansion = path_1.default.extname(fileName);
        const newFileName = this.uuidv4() + fileExpansion;
        return `${fileType}/${itemType}/${itemId}/${newFileName}`;
    }
}
exports.s3Service = new S3Service();
//# sourceMappingURL=s3.service.js.map