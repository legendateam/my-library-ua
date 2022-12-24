export interface IUserCreate {
    nickName: string,
    password: string,
    confirmPassword: string,
    email: string,
    avatar?: FileList
}
