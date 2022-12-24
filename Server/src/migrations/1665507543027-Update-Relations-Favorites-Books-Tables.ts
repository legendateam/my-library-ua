import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRelationsFavoritesBooksTables1665507543027 implements MigrationInterface {
    name = 'UpdateRelationsFavoritesBooksTables1665507543027'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorites" DROP CONSTRAINT "FK_5de72faa7fa33dcf03c769238dd"`);
        await queryRunner.query(`CREATE TABLE "favorites_books_books" ("favoritesId" integer NOT NULL, "booksId" integer NOT NULL, CONSTRAINT "PK_2ae3ed89c43813164d0f9de8adb" PRIMARY KEY ("favoritesId", "booksId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e082b14205d6d34250b302e97d" ON "favorites_books_books" ("favoritesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_fef4c9fe56bc7cc6b7884c17d7" ON "favorites_books_books" ("booksId") `);
        await queryRunner.query(`ALTER TABLE "favorites_books_books" ADD CONSTRAINT "FK_e082b14205d6d34250b302e97d8" FOREIGN KEY ("favoritesId") REFERENCES "favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "favorites_books_books" ADD CONSTRAINT "FK_fef4c9fe56bc7cc6b7884c17d77" FOREIGN KEY ("booksId") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorites_books_books" DROP CONSTRAINT "FK_fef4c9fe56bc7cc6b7884c17d77"`);
        await queryRunner.query(`ALTER TABLE "favorites_books_books" DROP CONSTRAINT "FK_e082b14205d6d34250b302e97d8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fef4c9fe56bc7cc6b7884c17d7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e082b14205d6d34250b302e97d"`);
        await queryRunner.query(`DROP TABLE "favorites_books_books"`);
        await queryRunner.query(`ALTER TABLE "favorites" ADD CONSTRAINT "FK_5de72faa7fa33dcf03c769238dd" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
