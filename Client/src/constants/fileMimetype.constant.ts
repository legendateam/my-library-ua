import { FileEnum } from '../enums';

export const fileMimetypeConstant = {
    [FileEnum.PHOTOS]: [
        'image/jpeg', // JPEG
        'image/pjpeg', // JPEG
        'image/png', //  PNG
        'image/webp', // WEBP
    ],
    [FileEnum.APPLICATION]: [
        'application/pdf', // PDF
        'application/epub+zip', // EPUB
        'application/rtf', // RTF
    ],
    [FileEnum.TEXTS]: [
        'text/plain', // TXT
    ],
    [FileEnum.AUDIOS]: [
        'audio/mp4', // MP4
        'audio/mpeg', // MP3 or MPEG
    ],
};
