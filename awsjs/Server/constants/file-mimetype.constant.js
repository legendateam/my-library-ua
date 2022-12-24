"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileMimetypeConstant = void 0;
const enums_1 = require("../enums");
exports.fileMimetypeConstant = {
    [enums_1.FileEnum.PHOTOS]: [
        'image/jpeg',
        'image/pjpeg',
        'image/png',
        'image/webp', // WEBP
    ],
    [enums_1.FileEnum.TEXTS]: [
        'text/plain',
        'application/pdf',
        'application/epub+zip',
        'application/rtf', // RTF
    ],
    [enums_1.FileEnum.AUDIOS]: [
        'audio/mp4',
        'audio/mpeg', // MP3 or MPEG
    ],
};
//# sourceMappingURL=file-mimetype.constant.js.map