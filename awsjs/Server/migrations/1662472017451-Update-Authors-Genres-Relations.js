"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAuthorsGenresRelations1662472017451 = void 0;
class UpdateAuthorsGenresRelations1662472017451 {
    constructor() {
        this.name = 'UpdateAuthorsGenresRelations1662472017451';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "authors_genres_genres" DROP CONSTRAINT "FK_d353d6cf8b54599feee7e1aa390"`);
        await queryRunner.query(`ALTER TABLE "authors_genres_genres" ADD CONSTRAINT "FK_d353d6cf8b54599feee7e1aa390" FOREIGN KEY ("genresId") REFERENCES "genres"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "authors_genres_genres" DROP CONSTRAINT "FK_d353d6cf8b54599feee7e1aa390"`);
        await queryRunner.query(`ALTER TABLE "authors_genres_genres" ADD CONSTRAINT "FK_d353d6cf8b54599feee7e1aa390" FOREIGN KEY ("genresId") REFERENCES "genres"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
exports.UpdateAuthorsGenresRelations1662472017451 = UpdateAuthorsGenresRelations1662472017451;
//# sourceMappingURL=1662472017451-Update-Authors-Genres-Relations.js.map