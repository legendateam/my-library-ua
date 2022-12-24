import { MigrationInterface, QueryRunner } from "typeorm";

export class DropColumnBookIdFavoritesTable1665522398728 implements MigrationInterface {
    name = 'DropColumnBookIdFavoritesTable1665522398728'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorites" DROP COLUMN "bookId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorites" ADD "bookId" integer NOT NULL`);
    }

}
