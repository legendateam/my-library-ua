import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeRelationsTableFavorites1664381418827 implements MigrationInterface {
    name = 'ChangeRelationsTableFavorites1664381418827'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "already_read" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" integer NOT NULL, "bookId" integer NOT NULL, CONSTRAINT "PK_3cdd19a56f8f67df0bcb7908ce8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "already_read" ADD CONSTRAINT "FK_a6268de85bcc2e76cccc01ebe9a" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "already_read" ADD CONSTRAINT "FK_358272d5f5f10e1aaed7bf4d0c1" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "already_read" DROP CONSTRAINT "FK_358272d5f5f10e1aaed7bf4d0c1"`);
        await queryRunner.query(`ALTER TABLE "already_read" DROP CONSTRAINT "FK_a6268de85bcc2e76cccc01ebe9a"`);
        await queryRunner.query(`DROP TABLE "already_read"`);
    }

}
