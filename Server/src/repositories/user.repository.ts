import { UpdateResult } from 'typeorm';

import { AppDataSource } from '../configs';
import { Users } from '../entities';
import { IUniqueUserField, IUser } from '../interfaces';
import { ISaveUserUpdate } from '../interfaces/save-user-update.interface';

class UserRepository {
    userRepository;

    constructor() {
        this.userRepository = AppDataSource.getRepository(Users);
    }

    public async createOne(user: IUser): Promise<Users> {
        return this.userRepository.save(user);
    }

    public async getOneByEmailOrNickName({ email, nickName }: IUniqueUserField): Promise<Users | null> {
        return this.userRepository.findOne({
            where: [
                { email },
                { nickName },
            ],
        });
    }

    public async getAll(): Promise<Users[]> {
        return this.userRepository.createQueryBuilder('users')
            .leftJoinAndSelect('users.comments', 'comments')
            .leftJoinAndSelect('users.alreadyRead', 'alreadyRead')
            .leftJoinAndSelect('users.willRead', 'willRead')
            .leftJoinAndSelect('users.favorites', 'favorites')
            .leftJoinAndSelect('users.ratings', 'ratings')
            .getMany();
    }

    public async getOneByEmail(email: string): Promise<Users | null> {
        return this.userRepository.findOneBy({ email });
    }

    public async getOneById(id: number): Promise<Users | null> {
        return this.userRepository.findOneBy({ id });
    }

    public async changePassword(id: number, password: string): Promise<UpdateResult> {
        return this.userRepository.update({ id }, { password });
    }

    public async updateAvatar(id: number, pathFile: string): Promise<UpdateResult> {
        return this.userRepository.update({ id }, { avatar: pathFile });
    }

    public async updateData(id: number, data: ISaveUserUpdate): Promise<UpdateResult> {
        return this.userRepository.update({ id }, data);
    }
}

export const userRepository = new UserRepository();
