export interface IUserUpdate {
    nickName: string,
    password: string,
    email: string,
    avatar: Express.Multer.File,
    currentPassword: string,
    clientKey: string,
}
