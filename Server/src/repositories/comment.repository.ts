import { AppDataSource } from '../configs';
import { Comments } from '../entities';
import { IComment } from '../interfaces';

class CommentRepository {
    commentRepository;

    constructor() {
        this.commentRepository = AppDataSource.getRepository(Comments);
    }

    public async getAllWithPagination(skip: number, take: number): Promise<Comments[]> {
        return this.commentRepository.find({ skip, take, relations: { user: true } });
    }

    public async getAll(): Promise<Comments[]> {
        return this.commentRepository.find();
    }

    public async createOne(comment: IComment): Promise<Comments> {
        return this.commentRepository.save(comment);
    }

    public async getAllByUserIdAndBookId(bookId: number, userId: number): Promise<Comments[] | null> {
        return this.commentRepository.find({ where: { bookId, userId } });
    }

    public async getOneById(commentId: number): Promise<Comments | null> {
        return this.commentRepository.findOneBy({ id: commentId });
    }
}

export const commentRepository = new CommentRepository();
