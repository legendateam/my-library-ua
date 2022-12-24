import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateColumnInBooksTable1663340037439 implements MigrationInterface {
    name = 'CreateColumnInBooksTable1663340037439'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" ADD "age" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "age"`);
    }

}
