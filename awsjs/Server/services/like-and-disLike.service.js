"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.likeAndDisLikeService = void 0;
const _1 = require(".");
const enums_1 = require("../enums");
class LikeAndDisLikeService {
    async getAllByCommentId(commentId) {
        return _1.clientService.getAnyKeysByNickName(commentId.toString(), enums_1.ClientKeyEnum.ACTIONS_LIKES);
    }
    async getOneByCommentId(commentId) {
        return _1.clientService.get(commentId);
    }
}
exports.likeAndDisLikeService = new LikeAndDisLikeService();
//# sourceMappingURL=like-and-disLike.service.js.map