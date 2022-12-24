"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRelationsWillReadBooksTables1665587779689 = void 0;
class UpdateRelationsWillReadBooksTables1665587779689 {
    constructor() {
        this.name = 'UpdateRelationsWillReadBooksTables1665587779689';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "will_read" DROP CONSTRAINT "FK_7b5387dc5c22248912627de8e54"`);
        await queryRunner.query(`CREATE TABLE "will_read_book_books" ("willReadId" integer NOT NULL, "booksId" integer NOT NULL, CONSTRAINT "PK_23b7569ac6a7f2f3ec8c50fbb37" PRIMARY KEY ("willReadId", "booksId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b3cfd5cdf31ac6c499b163bcf8" ON "will_read_book_books" ("willReadId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8e986bae562d2464310e9159c2" ON "will_read_book_books" ("booksId") `);
        await queryRunner.query(`ALTER TABLE "will_read_book_books" ADD CONSTRAINT "FK_b3cfd5cdf31ac6c499b163bcf82" FOREIGN KEY ("willReadId") REFERENCES "will_read"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "will_read_book_books" ADD CONSTRAINT "FK_8e986bae562d2464310e9159c20" FOREIGN KEY ("booksId") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "will_read_book_books" DROP CONSTRAINT "FK_8e986bae562d2464310e9159c20"`);
        await queryRunner.query(`ALTER TABLE "will_read_book_books" DROP CONSTRAINT "FK_b3cfd5cdf31ac6c499b163bcf82"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8e986bae562d2464310e9159c2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b3cfd5cdf31ac6c499b163bcf8"`);
        await queryRunner.query(`DROP TABLE "will_read_book_books"`);
        await queryRunner.query(`ALTER TABLE "will_read" ADD CONSTRAINT "FK_7b5387dc5c22248912627de8e54" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
exports.UpdateRelationsWillReadBooksTables1665587779689 = UpdateRelationsWillReadBooksTables1665587779689;
//# sourceMappingURL=1665587779689-Update-Relations-WillRead-Books-Tables.js.map