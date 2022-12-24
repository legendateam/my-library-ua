"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableGenres1657227809040 = void 0;
class CreateTableGenres1657227809040 {
    constructor() {
        this.name = 'CreateTableGenres1657227809040';
    }
    async up(queryRunner) {
        await queryRunner.query('CREATE TABLE "genres" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT \'2022-07-07T21:03:36Z\', "deletedAt" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "UQ_f105f8230a83b86a346427de94d" UNIQUE ("name"), CONSTRAINT "PK_80ecd718f0f00dde5d77a9be842" PRIMARY KEY ("id"))');
    }
    async down(queryRunner) {
        await queryRunner.query('DROP TABLE "genres"');
    }
}
exports.CreateTableGenres1657227809040 = CreateTableGenres1657227809040;
//# sourceMappingURL=1657227809040-Create_table_genres.js.map