import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeColumnNickNameNewWidthInTableUsers1657229241586 implements MigrationInterface {
    name = 'ChangeColumnNickNameNewWidthInTableUsers1657229241586';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "users" DROP CONSTRAINT "UQ_44b6d4cb3fe916de38974ed9c2f"');
        await queryRunner.query('ALTER TABLE "users" DROP COLUMN "nickName"');
        await queryRunner.query('ALTER TABLE "users" ADD "nickName" character varying NOT NULL');
        await queryRunner.query('ALTER TABLE "users" ADD CONSTRAINT "UQ_44b6d4cb3fe916de38974ed9c2f" UNIQUE ("nickName")');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "users" DROP CONSTRAINT "UQ_44b6d4cb3fe916de38974ed9c2f"');
        await queryRunner.query('ALTER TABLE "users" DROP COLUMN "nickName"');
        await queryRunner.query('ALTER TABLE "users" ADD "nickName" character varying(50) NOT NULL');
        await queryRunner.query('ALTER TABLE "users" ADD CONSTRAINT "UQ_44b6d4cb3fe916de38974ed9c2f" UNIQUE ("nickName")');
    }
}
