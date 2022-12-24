import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeColumnsInTableCommonsFieldsCreatedAtDeletedAt1657229897600 implements MigrationInterface {
    name = 'ChangeColumnsInTableCommonsFieldsCreatedAtDeletedAt1657229897600';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "commons_fields" ALTER COLUMN "createdAt" SET DEFAULT now()');
        await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "createdAt" SET DEFAULT now()');
        await queryRunner.query('ALTER TABLE "genres" ALTER COLUMN "createdAt" SET DEFAULT now()');
        await queryRunner.query('ALTER TABLE "authors" ALTER COLUMN "createdAt" SET DEFAULT now()');
        await queryRunner.query('ALTER TABLE "books" ALTER COLUMN "createdAt" SET DEFAULT now()');
        await queryRunner.query('ALTER TABLE "already_read" ALTER COLUMN "createdAt" SET DEFAULT now()');
        await queryRunner.query('ALTER TABLE "comments" ALTER COLUMN "createdAt" SET DEFAULT now()');
        await queryRunner.query('ALTER TABLE "favorites" ALTER COLUMN "createdAt" SET DEFAULT now()');
        await queryRunner.query('ALTER TABLE "ratings" ALTER COLUMN "createdAt" SET DEFAULT now()');
        await queryRunner.query('ALTER TABLE "will_read" ALTER COLUMN "createdAt" SET DEFAULT now()');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "will_read" ALTER COLUMN "createdAt" SET DEFAULT \'2022-07-07 21:09:53\'');
        await queryRunner.query('ALTER TABLE "ratings" ALTER COLUMN "createdAt" SET DEFAULT \'2022-07-07 21:02:55\'');
        await queryRunner.query('ALTER TABLE "favorites" ALTER COLUMN "createdAt" SET DEFAULT \'2022-07-07 20:57:59\'');
        await queryRunner.query('ALTER TABLE "comments" ALTER COLUMN "createdAt" SET DEFAULT \'2022-07-07 20:56:28\'');
        await queryRunner.query('ALTER TABLE "already_read" ALTER COLUMN "createdAt" SET DEFAULT \'2022-07-07 20:56:28\'');
        await queryRunner.query('ALTER TABLE "books" ALTER COLUMN "createdAt" SET DEFAULT \'2022-07-07 20:56:28\'');
        await queryRunner.query('ALTER TABLE "authors" ALTER COLUMN "createdAt" SET DEFAULT \'2022-07-07 20:56:28\'');
        await queryRunner.query('ALTER TABLE "genres" ALTER COLUMN "createdAt" SET DEFAULT \'2022-07-07 21:03:36\'');
        await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "createdAt" SET DEFAULT \'2022-07-07 21:05:32\'');
        await queryRunner.query('ALTER TABLE "commons_fields" ALTER COLUMN "createdAt" SET DEFAULT \'2022-07-07 20:56:28\'');
    }
}
