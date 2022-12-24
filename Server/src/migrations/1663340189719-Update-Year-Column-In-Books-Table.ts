import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateYearColumnInBooksTable1663340189719 implements MigrationInterface {
    name = 'UpdateYearColumnInBooksTable1663340189719'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" RENAME COLUMN "age" TO "yearOfRelease"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" RENAME COLUMN "yearOfRelease" TO "age"`);
    }

}
