import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeRelationsInTablesBooksAndAlreadyRead1664812514033 implements MigrationInterface {
    name = 'ChangeRelationsInTablesBooksAndAlreadyRead1664812514033'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "already_read" DROP CONSTRAINT "FK_358272d5f5f10e1aaed7bf4d0c1"`);
        await queryRunner.query(`CREATE TABLE "already_read_book_books" ("alreadyReadId" integer NOT NULL, "booksId" integer NOT NULL, CONSTRAINT "PK_17a1451e39c96d041bd47fbd397" PRIMARY KEY ("alreadyReadId", "booksId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_eaeaa177ac93d772fc2c098bb8" ON "already_read_book_books" ("alreadyReadId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2fbe0012a8bb8e8b932931020d" ON "already_read_book_books" ("booksId") `);
        await queryRunner.query(`ALTER TABLE "already_read" DROP COLUMN "bookId"`);
        await queryRunner.query(`ALTER TABLE "already_read_book_books" ADD CONSTRAINT "FK_eaeaa177ac93d772fc2c098bb8f" FOREIGN KEY ("alreadyReadId") REFERENCES "already_read"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "already_read_book_books" ADD CONSTRAINT "FK_2fbe0012a8bb8e8b932931020de" FOREIGN KEY ("booksId") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "already_read_book_books" DROP CONSTRAINT "FK_2fbe0012a8bb8e8b932931020de"`);
        await queryRunner.query(`ALTER TABLE "already_read_book_books" DROP CONSTRAINT "FK_eaeaa177ac93d772fc2c098bb8f"`);
        await queryRunner.query(`ALTER TABLE "already_read" ADD "bookId" integer NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2fbe0012a8bb8e8b932931020d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_eaeaa177ac93d772fc2c098bb8"`);
        await queryRunner.query(`DROP TABLE "already_read_book_books"`);
        await queryRunner.query(`ALTER TABLE "already_read" ADD CONSTRAINT "FK_358272d5f5f10e1aaed7bf4d0c1" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
