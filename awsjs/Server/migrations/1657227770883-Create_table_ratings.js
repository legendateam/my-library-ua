"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableRatings1657227770883 = void 0;
class CreateTableRatings1657227770883 {
    constructor() {
        this.name = 'CreateTableRatings1657227770883';
    }
    async up(queryRunner) {
        await queryRunner.query('CREATE TABLE "ratings" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT \'2022-07-07T21:02:55Z\', "deletedAt" TIMESTAMP, "rate" integer NOT NULL, "userId" integer NOT NULL, "bookId" integer NOT NULL, CONSTRAINT "PK_0f31425b073219379545ad68ed9" PRIMARY KEY ("id"))');
    }
    async down(queryRunner) {
        await queryRunner.query('DROP TABLE "ratings"');
    }
}
exports.CreateTableRatings1657227770883 = CreateTableRatings1657227770883;
//# sourceMappingURL=1657227770883-Create_table_ratings.js.map