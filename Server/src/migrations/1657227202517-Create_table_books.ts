import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableBooks1657227202517 implements MigrationInterface {
    name = 'CreateTableBooks1657227202517';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE "books" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT \'2022-07-07T20:53:28Z\', "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "description" character varying NOT NULL, "fileText" character varying NOT NULL, "cover" character varying, "fileAudio" character varying, "authorId" integer NOT NULL, CONSTRAINT "UQ_f1b4b912c656dcc8f1766a9877e" UNIQUE ("description"), CONSTRAINT "UQ_3710eef7222a3f7a35c658d4bfa" UNIQUE ("fileText"), CONSTRAINT "UQ_19841a6eb66137afac8f3744cd9" UNIQUE ("cover"), CONSTRAINT "UQ_e62f422b0b9fdfb650cfe94a566" UNIQUE ("fileAudio"), CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id"))');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE "books"');
    }
}
