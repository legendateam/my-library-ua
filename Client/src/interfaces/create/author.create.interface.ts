export interface IAuthorCreate {
    firstName: string,
    lastName: string,
    pseudonym?: string,
    dateBirthday: string,
    dateDeath?: string,
    country: string,
    biography: string,
    photo?: FileList,
    genres: number[];
}
