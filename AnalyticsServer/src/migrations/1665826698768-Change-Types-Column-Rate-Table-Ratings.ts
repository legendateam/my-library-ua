import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeTypesColumnRateTableRatings1665826698768 implements MigrationInterface {
    name = 'ChangeTypesColumnRateTableRatings1665826698768'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ratings" DROP COLUMN "rate"`);
        await queryRunner.query(`ALTER TABLE "ratings" ADD "rate" double precision NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ratings" DROP COLUMN "rate"`);
        await queryRunner.query(`ALTER TABLE "ratings" ADD "rate" integer NOT NULL`);
    }

}
