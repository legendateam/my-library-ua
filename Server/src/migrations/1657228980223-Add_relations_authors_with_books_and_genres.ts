import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRelationsAuthorsWithBooksAndGenres1657228980223 implements MigrationInterface {
    name = 'AddRelationsAuthorsWithBooksAndGenres1657228980223';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE "genres_authors_authors" ("genresId" integer NOT NULL, "authorsId" integer NOT NULL, CONSTRAINT "PK_e257fa881a52e26ae330ba9d716" PRIMARY KEY ("genresId", "authorsId"))');
        await queryRunner.query('CREATE INDEX "IDX_009e803672140c9b0c3733ff9d" ON "genres_authors_authors" ("genresId") ');
        await queryRunner.query('CREATE INDEX "IDX_c20a71e2858a7ea9306dc01719" ON "genres_authors_authors" ("authorsId") ');
        await queryRunner.query('CREATE TABLE "authors_genres_genres" ("authorsId" integer NOT NULL, "genresId" integer NOT NULL, CONSTRAINT "PK_c47035f684e125eac7dc6af6489" PRIMARY KEY ("authorsId", "genresId"))');
        await queryRunner.query('CREATE INDEX "IDX_8307e825982327fa3f0826b183" ON "authors_genres_genres" ("authorsId") ');
        await queryRunner.query('CREATE INDEX "IDX_d353d6cf8b54599feee7e1aa39" ON "authors_genres_genres" ("genresId") ');
        await queryRunner.query('ALTER TABLE "books" ADD CONSTRAINT "FK_54f49efe2dd4d2850e736e9ab86" FOREIGN KEY ("authorId") REFERENCES "authors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "genres_authors_authors" ADD CONSTRAINT "FK_009e803672140c9b0c3733ff9d7" FOREIGN KEY ("genresId") REFERENCES "genres"("id") ON DELETE CASCADE ON UPDATE CASCADE');
        await queryRunner.query('ALTER TABLE "genres_authors_authors" ADD CONSTRAINT "FK_c20a71e2858a7ea9306dc017198" FOREIGN KEY ("authorsId") REFERENCES "authors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "authors_genres_genres" ADD CONSTRAINT "FK_8307e825982327fa3f0826b1831" FOREIGN KEY ("authorsId") REFERENCES "authors"("id") ON DELETE CASCADE ON UPDATE CASCADE');
        await queryRunner.query('ALTER TABLE "authors_genres_genres" ADD CONSTRAINT "FK_d353d6cf8b54599feee7e1aa390" FOREIGN KEY ("genresId") REFERENCES "genres"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "authors_genres_genres" DROP CONSTRAINT "FK_d353d6cf8b54599feee7e1aa390"');
        await queryRunner.query('ALTER TABLE "authors_genres_genres" DROP CONSTRAINT "FK_8307e825982327fa3f0826b1831"');
        await queryRunner.query('ALTER TABLE "genres_authors_authors" DROP CONSTRAINT "FK_c20a71e2858a7ea9306dc017198"');
        await queryRunner.query('ALTER TABLE "genres_authors_authors" DROP CONSTRAINT "FK_009e803672140c9b0c3733ff9d7"');
        await queryRunner.query('ALTER TABLE "books" DROP CONSTRAINT "FK_54f49efe2dd4d2850e736e9ab86"');
        await queryRunner.query('DROP INDEX "public"."IDX_d353d6cf8b54599feee7e1aa39"');
        await queryRunner.query('DROP INDEX "public"."IDX_8307e825982327fa3f0826b183"');
        await queryRunner.query('DROP TABLE "authors_genres_genres"');
        await queryRunner.query('DROP INDEX "public"."IDX_c20a71e2858a7ea9306dc01719"');
        await queryRunner.query('DROP INDEX "public"."IDX_009e803672140c9b0c3733ff9d"');
        await queryRunner.query('DROP TABLE "genres_authors_authors"');
    }
}
