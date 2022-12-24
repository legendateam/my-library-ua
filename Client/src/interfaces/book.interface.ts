export interface IBook {
    name: string,
    yearOfRelease?: string,
    description: string,
    fileText: FileList,
    cover: FileList,
    fileAudio: FileList,
    authorId: number | number[],
    genres: number[],
}
