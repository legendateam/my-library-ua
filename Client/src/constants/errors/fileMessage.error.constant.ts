import { fileFormatUtil, fileSizeUtil } from '../../utils';
import { FileEnum } from '../../enums';
import { fileSizeConstant } from '../fileSize.constant';

class FileMessageErrorConstant {
    public static errorAvatarFormatConstant() {
        return `Формат файла повинен бути${fileFormatUtil(FileEnum.PHOTOS)}`;
    }

    public static errorAvatarSizeConstant() {
        return `розмір завеликий, повинен бути не більше ${fileSizeUtil(fileSizeConstant.SIZE_AVATAR)}Mb`;
    }

    public static errorTextsFormatConstant() {
        return `Формат файла повинен бути${fileFormatUtil(FileEnum.APPLICATION)}`.replaceAll('texts', '');
    }

    public static errorTextsSizeConstant() {
        return `розмір завеликий, повинен бути не більше ${fileSizeUtil(fileSizeConstant.SIZE_BOOK_TEXT_FILE)}Mb`;
    }

    public static errorAudioFormatConstant() {
        return `Формат файла повинен бути${fileFormatUtil(FileEnum.AUDIOS)}`;
    }

    public static errorAudioSizeConstant() {
        return `розмір завеликий, повинен бути не більше ${fileSizeUtil(fileSizeConstant.SIZE_AUDIO_BOOK)}Mb`;
    }
}

export const {
    errorAvatarFormatConstant, errorAvatarSizeConstant,
    errorTextsFormatConstant, errorTextsSizeConstant,
    errorAudioFormatConstant, errorAudioSizeConstant,
} = FileMessageErrorConstant;
