export interface IUpdateUser {
    nickName: string,
    password: string,
    email: string,
    avatar: FileList,
    confirmPassword: string,
    currentPassword: string,
    clientKey: string,
}
