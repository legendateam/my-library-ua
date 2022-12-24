"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeColumnNameBookBooksAlreadyReaddyRead1664815327424 = void 0;
class ChangeColumnNameBookBooksAlreadyReaddyRead1664815327424 {
    constructor() {
        this.name = 'ChangeColumnNameBookBooksAlreadyReaddyRead1664815327424';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "already_read_books_books" ("alreadyReadId" integer NOT NULL, "booksId" integer NOT NULL, CONSTRAINT "PK_502a888cedd2124623270f989a4" PRIMARY KEY ("alreadyReadId", "booksId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cf61218d9231b2208175ac1511" ON "already_read_books_books" ("alreadyReadId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7eb338d9a0ee0302f211f4a909" ON "already_read_books_books" ("booksId") `);
        await queryRunner.query(`ALTER TABLE "already_read_books_books" ADD CONSTRAINT "FK_cf61218d9231b2208175ac15114" FOREIGN KEY ("alreadyReadId") REFERENCES "already_read"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "already_read_books_books" ADD CONSTRAINT "FK_7eb338d9a0ee0302f211f4a9093" FOREIGN KEY ("booksId") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "already_read_books_books" DROP CONSTRAINT "FK_7eb338d9a0ee0302f211f4a9093"`);
        await queryRunner.query(`ALTER TABLE "already_read_books_books" DROP CONSTRAINT "FK_cf61218d9231b2208175ac15114"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7eb338d9a0ee0302f211f4a909"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cf61218d9231b2208175ac1511"`);
        await queryRunner.query(`DROP TABLE "already_read_books_books"`);
    }
}
exports.ChangeColumnNameBookBooksAlreadyReaddyRead1664815327424 = ChangeColumnNameBookBooksAlreadyReaddyRead1664815327424;
//# sourceMappingURL=1664815327424-Change-Column-Name-Book-Books-Already-Readdy-Read.js.map