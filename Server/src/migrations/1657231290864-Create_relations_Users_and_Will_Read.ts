import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRelationsUsersAndWillRead1657231290864 implements MigrationInterface {
    name = 'CreateRelationsUsersAndWillRead1657231290864';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "will_read" ADD CONSTRAINT "FK_3746bbbd35e2d8b872b6bbf6326" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "will_read" DROP CONSTRAINT "FK_3746bbbd35e2d8b872b6bbf6326"');
    }
}
