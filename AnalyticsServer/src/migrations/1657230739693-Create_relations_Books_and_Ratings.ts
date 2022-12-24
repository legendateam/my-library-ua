import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRelationsBooksAndRatings1657230739693 implements MigrationInterface {
    name = 'CreateRelationsBooksAndRatings1657230739693';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "ratings" ADD CONSTRAINT "FK_0563ca767066800a8b2123e6d15" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "ratings" DROP CONSTRAINT "FK_0563ca767066800a8b2123e6d15"');
    }
}
