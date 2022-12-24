export interface IAuthor {
    firstName: string,
    lastName: string,
    pseudonym?: string,
    dateBirthday: string,
    dateDeath?: string,
    country: string,
    biography: string,
    photo?: string,
    genres: number[];
}
