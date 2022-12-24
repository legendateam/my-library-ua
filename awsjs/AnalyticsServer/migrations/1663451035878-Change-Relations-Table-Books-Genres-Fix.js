"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeRelationsTableBooksGenresFix1663451035878 = void 0;
class ChangeRelationsTableBooksGenresFix1663451035878 {
    constructor() {
        this.name = 'ChangeRelationsTableBooksGenresFix1663451035878';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "books_genres_genres" ("booksId" integer NOT NULL, "genresId" integer NOT NULL, CONSTRAINT "PK_5773bf45b53a35762fd16cc97a0" PRIMARY KEY ("booksId", "genresId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e1c8b5fb4c9afac80b2591b0c8" ON "books_genres_genres" ("booksId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8d2218df7344c443d9ded15492" ON "books_genres_genres" ("genresId") `);
        await queryRunner.query(`ALTER TABLE "books_genres_genres" ADD CONSTRAINT "FK_e1c8b5fb4c9afac80b2591b0c84" FOREIGN KEY ("booksId") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "books_genres_genres" ADD CONSTRAINT "FK_8d2218df7344c443d9ded154921" FOREIGN KEY ("genresId") REFERENCES "genres"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "books_genres_genres" DROP CONSTRAINT "FK_8d2218df7344c443d9ded154921"`);
        await queryRunner.query(`ALTER TABLE "books_genres_genres" DROP CONSTRAINT "FK_e1c8b5fb4c9afac80b2591b0c84"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8d2218df7344c443d9ded15492"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e1c8b5fb4c9afac80b2591b0c8"`);
        await queryRunner.query(`DROP TABLE "books_genres_genres"`);
    }
}
exports.ChangeRelationsTableBooksGenresFix1663451035878 = ChangeRelationsTableBooksGenresFix1663451035878;
//# sourceMappingURL=1663451035878-Change-Relations-Table-Books-Genres-Fix.js.map