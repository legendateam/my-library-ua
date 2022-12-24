import { UpdateResult } from 'typeorm';

import { userRepository } from '../repositories';
import { IUniqueUserField } from '../interfaces';
import { Users } from '../entities';
import { bcryptService } from './bcrypt.service';

export class UserService {
    public async getOneByEmailOrNickName(data: IUniqueUserField): Promise<Users | null> {
        return userRepository.getOneByEmailOrNickName(data);
    }

    public async getOneByEmail(email: string): Promise<Users | null> {
        return userRepository.getOneByEmail(email);
    }

    public async getOneById(id: number): Promise<Users | null> {
        return userRepository.getOneById(id);
    }

    public async changePassword(id: number, password: string): Promise<UpdateResult> {
        const hashPassword = await bcryptService.hash(password);
        return userRepository.changePassword(id, hashPassword);
    }

    public async updateAvatar(id: number, pathFile: string): Promise<UpdateResult> {
        return userRepository.updateAvatar(id, pathFile);
    }
}

export const userService = new UserService();
