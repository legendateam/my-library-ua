import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableAuthors1657226787033 implements MigrationInterface {
    name = 'CreateTableAuthors1657226787033';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE "authors" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT \'2022-07-07T20:46:31Z\', "deletedAt" TIMESTAMP, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "pseudonym" character varying, "dateBirthday" date NOT NULL, "dateDeath" date, "country" character varying NOT NULL, "age" integer NOT NULL, "biography" character varying NOT NULL, "photo" character varying, CONSTRAINT "UQ_0059dbafbfea66689633b231179" UNIQUE ("pseudonym"), CONSTRAINT "UQ_b2130246670ef949e96a716ac41" UNIQUE ("photo"), CONSTRAINT "PK_d2ed02fabd9b52847ccb85e6b88" PRIMARY KEY ("id"))');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE "authors"');
    }
}
