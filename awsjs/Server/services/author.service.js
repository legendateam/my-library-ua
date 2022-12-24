"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorService = void 0;
const entities_1 = require("../entities");
const repositories_1 = require("../repositories");
const genresRelations_service_1 = require("./genresRelations.service");
const pagination_service_1 = require("./pagination.service");
class AuthorService {
    async createWithRelationsByGenres({ author, genresId }) {
        const newAuthor = new entities_1.Authors();
        if (author?.dateDeath)
            newAuthor.dateDeath = author.dateDeath;
        if (author?.pseudonym)
            newAuthor.pseudonym = author.pseudonym;
        if (author?.photo)
            newAuthor.photo = author.photo;
        if (author?.biography)
            newAuthor.biography = author.biography;
        if (author?.country)
            newAuthor.country = author.country;
        if (author?.dateBirthday)
            newAuthor.dateBirthday = author.dateBirthday;
        if (author?.firstName)
            newAuthor.firstName = author.firstName;
        if (author?.lastName)
            newAuthor.lastName = author.lastName;
        const genres = (0, genresRelations_service_1.genresRelationsService)(genresId);
        if (genres)
            newAuthor.genres = genres;
        return repositories_1.authorRepository.createOne(newAuthor);
    }
    async patchingFields({ id, newFields }) {
        const authorsForPatching = new entities_1.Authors();
        if (newFields?.dateDeath)
            authorsForPatching.dateDeath = newFields.dateDeath;
        if (newFields?.pseudonym)
            authorsForPatching.pseudonym = newFields.pseudonym;
        if (newFields?.photo)
            authorsForPatching.photo = newFields.photo;
        if (newFields?.biography)
            authorsForPatching.biography = newFields.biography;
        if (newFields?.firstName)
            authorsForPatching.firstName = newFields.firstName;
        if (newFields?.lastName)
            authorsForPatching.lastName = newFields.lastName;
        if (newFields?.country)
            authorsForPatching.country = newFields.country;
        if (newFields.genres) {
            const genres = (0, genresRelations_service_1.genresRelationsService)(newFields.genres);
            if (genres)
                authorsForPatching.genres = genres;
            return repositories_1.authorRepository.updateOne(id, { ...authorsForPatching });
        }
        return repositories_1.authorRepository.updateOne(id, { ...authorsForPatching });
    }
    async getAllWithPagination(page = 1, perPage = 30) {
        const skip = pagination_service_1.paginationService.createSkip(page, perPage);
        return repositories_1.authorRepository.getAllWithPagination(skip, perPage);
    }
    async getOneByPseudonym(pseudonym) {
        if (pseudonym) {
            return repositories_1.authorRepository.getOneByPseudonym(pseudonym);
        }
        return null;
    }
}
exports.authorService = new AuthorService();
//# sourceMappingURL=author.service.js.map