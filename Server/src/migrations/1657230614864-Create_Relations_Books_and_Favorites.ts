import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRelationsBooksAndFavorites1657230614864 implements MigrationInterface {
    name = 'CreateRelationsBooksAndFavorites1657230614864';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "favorites" ADD CONSTRAINT "FK_5de72faa7fa33dcf03c769238dd" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "favorites" DROP CONSTRAINT "FK_5de72faa7fa33dcf03c769238dd"');
    }
}
