import { commentRepository } from '../repositories';
import { Comments } from '../entities';
import { paginationService } from './pagination.service';

class CommentService {
    public async getAllPagination(page = 1, perPage = 10): Promise<Comments[]> {
        const skip = paginationService.createSkip(page, perPage);
        return commentRepository.getAllWithPagination(skip, perPage);
    }
}

export const commentService = new CommentService();
