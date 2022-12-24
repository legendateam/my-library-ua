"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genresRelationsService = void 0;
const entities_1 = require("../entities");
const genresRelationsService = (genresId) => {
    const genres = [];
    if (typeof genresId === 'object') {
        genresId.forEach((genreId) => {
            const genre = new entities_1.Genres();
            genre.id = genreId;
            genres.push(genre);
        });
        return genres;
    }
    const genre = new entities_1.Genres();
    genre.id = genresId;
    genres.push(genre);
    return genres;
};
exports.genresRelationsService = genresRelationsService;
//# sourceMappingURL=genresRelations.service.js.map