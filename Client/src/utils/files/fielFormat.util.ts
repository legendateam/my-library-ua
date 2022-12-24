import { fileMimetypeConstant } from '../../constants';
import { FileEnum } from '../../enums';

export const fileFormatUtil = (fileType: FileEnum): string => {
    let searchValue = FileEnum.PHOTOS;

    if (fileType === FileEnum.APPLICATION || fileType === FileEnum.TEXTS) {
        searchValue = FileEnum.APPLICATION;
    }

    if (fileType === FileEnum.AUDIOS) {
        searchValue = FileEnum.AUDIOS;
    }

    return fileMimetypeConstant[fileType].join('/')
        .split('/').join(' ').replaceAll(searchValue, '');
};
// function include any file mimetype and return one string with format file name without any symbol, example: 'jpeg png webp'
