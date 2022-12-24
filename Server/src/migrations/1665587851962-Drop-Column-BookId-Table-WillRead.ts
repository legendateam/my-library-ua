import { MigrationInterface, QueryRunner } from "typeorm";

export class DropColumnBookIdTableWillRead1665587851962 implements MigrationInterface {
    name = 'DropColumnBookIdTableWillRead1665587851962'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "will_read" DROP COLUMN "bookId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "will_read" ADD "bookId" integer NOT NULL`);
    }

}
