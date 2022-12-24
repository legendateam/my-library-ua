import { AppDataSource } from '../configs';
import { Users } from '../entities';
import { RoleEnum } from '../enums';

class UserRepository {
    userRepository;

    constructor() {
        this.userRepository = AppDataSource.getRepository(Users);
    }

    public async getOneById(id: number): Promise<Users | null> {
        return this.userRepository.findOneBy({ id });
    }

    public async getOneByRole(role: RoleEnum): Promise<Users | null> {
        return this.userRepository.findOneBy({ role });
    }

    public async getCountNewUsers(date: string): Promise<number> {
        return this.userRepository.createQueryBuilder('user')
            .where('user.createdAt >= :date', { date })
            .getCount();
    }

    public async getAllCount(): Promise<number> {
        return this.userRepository.createQueryBuilder('user')
            .getCount();
    }
}

export const userRepository = new UserRepository();
