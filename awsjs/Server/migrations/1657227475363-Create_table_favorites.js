"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableFavorites1657227475363 = void 0;
class CreateTableFavorites1657227475363 {
    constructor() {
        this.name = 'CreateTableFavorites1657227475363';
    }
    async up(queryRunner) {
        await queryRunner.query('CREATE TABLE "favorites" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT \'2022-07-07T20:57:59Z\', "deletedAt" TIMESTAMP, "userId" integer NOT NULL, "bookId" integer NOT NULL, CONSTRAINT "PK_890818d27523748dd36a4d1bdc8" PRIMARY KEY ("id"))');
    }
    async down(queryRunner) {
        await queryRunner.query('DROP TABLE "favorites"');
    }
}
exports.CreateTableFavorites1657227475363 = CreateTableFavorites1657227475363;
//# sourceMappingURL=1657227475363-Create_table_favorites.js.map