import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRelationsUsersAndFavorites1657231080802 implements MigrationInterface {
    name = 'CreateRelationsUsersAndFavorites1657231080802';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "favorites" ADD CONSTRAINT "FK_e747534006c6e3c2f09939da60f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "favorites" DROP CONSTRAINT "FK_e747534006c6e3c2f09939da60f"');
    }
}
