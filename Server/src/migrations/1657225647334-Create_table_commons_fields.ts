import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableCommonsFields1657225647334 implements MigrationInterface {
    name = 'CreateTableCommonsFields1657225647334';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE "commons_fields" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT \'2022-07-07T20:27:33Z\', "deletedAt" TIMESTAMP, CONSTRAINT "PK_3e400b51fb79e0f61348fb593f3" PRIMARY KEY ("id"))');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE "commons_fields"');
    }
}
