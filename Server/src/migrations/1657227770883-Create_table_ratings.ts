import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableRatings1657227770883 implements MigrationInterface {
    name = 'CreateTableRatings1657227770883';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE "ratings" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT \'2022-07-07T21:02:55Z\', "deletedAt" TIMESTAMP, "rate" integer NOT NULL, "userId" integer NOT NULL, "bookId" integer NOT NULL, CONSTRAINT "PK_0f31425b073219379545ad68ed9" PRIMARY KEY ("id"))');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE "ratings"');
    }
}
