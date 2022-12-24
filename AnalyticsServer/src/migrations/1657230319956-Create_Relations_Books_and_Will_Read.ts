import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRelationsBooksAndWillRead1657230319956 implements MigrationInterface {
    name = 'CreateRelationsBooksAndWillRead1657230319956';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "will_read" ADD CONSTRAINT "FK_7b5387dc5c22248912627de8e54" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "will_read" DROP CONSTRAINT "FK_7b5387dc5c22248912627de8e54"');
    }
}
