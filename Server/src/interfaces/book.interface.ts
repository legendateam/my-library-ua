export interface IBook {
    name: string,
    description: string,
    fileText?: string,
    cover?: string,
    yearOfRelease?: number,
    fileAudio?: string,
    authorId: number,
    genres: number[] | number,
}
