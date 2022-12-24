import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableWillRead1657228188546 implements MigrationInterface {
    name = 'CreateTableWillRead1657228188546';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE "will_read" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT \'2022-07-07T21:09:53Z\', "deletedAt" TIMESTAMP, "userId" integer NOT NULL, "bookId" integer NOT NULL, CONSTRAINT "PK_8a024949819a8595227f48bbf0e" PRIMARY KEY ("id"))');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE "will_read"');
    }
}
