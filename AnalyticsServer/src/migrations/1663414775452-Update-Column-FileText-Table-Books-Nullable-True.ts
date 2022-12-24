import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateColumnFileTextTableBooksNullableTrue1663414775452 implements MigrationInterface {
    name = 'UpdateColumnFileTextTableBooksNullableTrue1663414775452'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" ALTER COLUMN "fileText" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" ALTER COLUMN "fileText" SET NOT NULL`);
    }

}
