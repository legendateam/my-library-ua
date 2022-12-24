"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableAlreadyRead1657226536461 = void 0;
class CreateTableAlreadyRead1657226536461 {
    constructor() {
        this.name = 'CreateTableAlreadyRead1657226536461';
    }
    async up(queryRunner) {
        await queryRunner.query('CREATE TABLE "already_read" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT \'2022-07-07T20:42:21Z\', "deletedAt" TIMESTAMP, "userId" integer NOT NULL, "bookId" integer NOT NULL, CONSTRAINT "PK_3cdd19a56f8f67df0bcb7908ce8" PRIMARY KEY ("id"))');
    }
    async down(queryRunner) {
        await queryRunner.query('DROP TABLE "already_read"');
    }
}
exports.CreateTableAlreadyRead1657226536461 = CreateTableAlreadyRead1657226536461;
//# sourceMappingURL=1657226536461-Create_table_already_read.js.map