import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableAlreadyRead1657226536461 implements MigrationInterface {
    name = 'CreateTableAlreadyRead1657226536461';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE "already_read" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT \'2022-07-07T20:42:21Z\', "deletedAt" TIMESTAMP, "userId" integer NOT NULL, "bookId" integer NOT NULL, CONSTRAINT "PK_3cdd19a56f8f67df0bcb7908ce8" PRIMARY KEY ("id"))');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE "already_read"');
    }
}
