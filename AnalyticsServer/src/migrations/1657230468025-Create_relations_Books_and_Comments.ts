import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRelationsBooksAndComments1657230468025 implements MigrationInterface {
    name = 'CreateRelationsBooksAndComments1657230468025';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "comments" ADD CONSTRAINT "FK_fe496134857bf079aa6b55d68df" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "comments" DROP CONSTRAINT "FK_fe496134857bf079aa6b55d68df"');
    }
}
