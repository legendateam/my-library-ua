type file = Express.Multer.File[];

export interface IFileExtended extends file {
    fileText?: Express.Multer.File[],
    cover?: Express.Multer.File[],
    fileAudio?: Express.Multer.File[]
}
