import { clientService } from '.';
import { ClientKeyEnum } from '../enums';

class LikeAndDisLikeService {
    public async getAllByCommentId(commentId: string): Promise<string[]> {
        return clientService.getAnyKeysByNickName(commentId.toString(), ClientKeyEnum.ACTIONS_LIKES);
    }

    public async getOneByCommentId(commentId: string): Promise<string | null> {
        return clientService.get(commentId);
    }
}

export const likeAndDisLikeService = new LikeAndDisLikeService();
