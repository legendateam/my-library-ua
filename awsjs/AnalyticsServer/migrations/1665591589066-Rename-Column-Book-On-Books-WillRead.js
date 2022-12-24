"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenameColumnBookOnBooksWillRead1665591589066 = void 0;
class RenameColumnBookOnBooksWillRead1665591589066 {
    constructor() {
        this.name = 'RenameColumnBookOnBooksWillRead1665591589066';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "will_read_books_books" ("willReadId" integer NOT NULL, "booksId" integer NOT NULL, CONSTRAINT "PK_929df586154c8253934e8ce2cfc" PRIMARY KEY ("willReadId", "booksId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_86195ab1df2b0aad2fbde832f5" ON "will_read_books_books" ("willReadId") `);
        await queryRunner.query(`CREATE INDEX "IDX_78d765975cc5c04100d2ce3b01" ON "will_read_books_books" ("booksId") `);
        await queryRunner.query(`ALTER TABLE "will_read_books_books" ADD CONSTRAINT "FK_86195ab1df2b0aad2fbde832f5d" FOREIGN KEY ("willReadId") REFERENCES "will_read"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "will_read_books_books" ADD CONSTRAINT "FK_78d765975cc5c04100d2ce3b012" FOREIGN KEY ("booksId") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "will_read_books_books" DROP CONSTRAINT "FK_78d765975cc5c04100d2ce3b012"`);
        await queryRunner.query(`ALTER TABLE "will_read_books_books" DROP CONSTRAINT "FK_86195ab1df2b0aad2fbde832f5d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_78d765975cc5c04100d2ce3b01"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_86195ab1df2b0aad2fbde832f5"`);
        await queryRunner.query(`DROP TABLE "will_read_books_books"`);
    }
}
exports.RenameColumnBookOnBooksWillRead1665591589066 = RenameColumnBookOnBooksWillRead1665591589066;
//# sourceMappingURL=1665591589066-Rename-Column-Book-On-Books-WillRead.js.map