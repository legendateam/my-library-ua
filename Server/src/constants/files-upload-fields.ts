import { FilesUploadFieldsEnum } from '../enums';

export const filesUploadFields = [
    { name: FilesUploadFieldsEnum.FILE_TEXT, maxCount: 1 },
    { name: FilesUploadFieldsEnum.COVER, maxCount: 1 },
    { name: FilesUploadFieldsEnum.FILE_AUDIO, maxCount: 1 },
];
