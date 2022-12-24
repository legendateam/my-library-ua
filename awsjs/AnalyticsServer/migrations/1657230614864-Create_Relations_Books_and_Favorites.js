"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRelationsBooksAndFavorites1657230614864 = void 0;
class CreateRelationsBooksAndFavorites1657230614864 {
    constructor() {
        this.name = 'CreateRelationsBooksAndFavorites1657230614864';
    }
    async up(queryRunner) {
        await queryRunner.query('ALTER TABLE "favorites" ADD CONSTRAINT "FK_5de72faa7fa33dcf03c769238dd" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }
    async down(queryRunner) {
        await queryRunner.query('ALTER TABLE "favorites" DROP CONSTRAINT "FK_5de72faa7fa33dcf03c769238dd"');
    }
}
exports.CreateRelationsBooksAndFavorites1657230614864 = CreateRelationsBooksAndFavorites1657230614864;
//# sourceMappingURL=1657230614864-Create_Relations_Books_and_Favorites.js.map