import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateAuthorsGenresRelations1662472017451 implements MigrationInterface {
    name = 'UpdateAuthorsGenresRelations1662472017451'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "authors_genres_genres" DROP CONSTRAINT "FK_d353d6cf8b54599feee7e1aa390"`);
        await queryRunner.query(`ALTER TABLE "authors_genres_genres" ADD CONSTRAINT "FK_d353d6cf8b54599feee7e1aa390" FOREIGN KEY ("genresId") REFERENCES "genres"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "authors_genres_genres" DROP CONSTRAINT "FK_d353d6cf8b54599feee7e1aa390"`);
        await queryRunner.query(`ALTER TABLE "authors_genres_genres" ADD CONSTRAINT "FK_d353d6cf8b54599feee7e1aa390" FOREIGN KEY ("genresId") REFERENCES "genres"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
