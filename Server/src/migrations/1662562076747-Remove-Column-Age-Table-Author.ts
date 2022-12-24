import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveColumnAgeTableAuthor1662562076747 implements MigrationInterface {
    name = 'RemoveColumnAgeTableAuthor1662562076747'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "authors" DROP COLUMN "age"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "authors" ADD "age" integer NOT NULL`);
    }

}
