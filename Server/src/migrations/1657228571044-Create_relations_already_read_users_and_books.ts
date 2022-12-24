import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRelationsAlreadyReadUsersAndBooks1657228571044 implements MigrationInterface {
    name = 'CreateRelationsAlreadyReadUsersAndBooks1657228571044';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "already_read" ADD CONSTRAINT "FK_a6268de85bcc2e76cccc01ebe9a" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "already_read" ADD CONSTRAINT "FK_358272d5f5f10e1aaed7bf4d0c1" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "already_read" DROP CONSTRAINT "FK_358272d5f5f10e1aaed7bf4d0c1"');
        await queryRunner.query('ALTER TABLE "already_read" DROP CONSTRAINT "FK_a6268de85bcc2e76cccc01ebe9a"');
    }
}
