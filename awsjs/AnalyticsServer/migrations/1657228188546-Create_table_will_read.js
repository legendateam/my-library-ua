"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableWillRead1657228188546 = void 0;
class CreateTableWillRead1657228188546 {
    constructor() {
        this.name = 'CreateTableWillRead1657228188546';
    }
    async up(queryRunner) {
        await queryRunner.query('CREATE TABLE "will_read" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT \'2022-07-07T21:09:53Z\', "deletedAt" TIMESTAMP, "userId" integer NOT NULL, "bookId" integer NOT NULL, CONSTRAINT "PK_8a024949819a8595227f48bbf0e" PRIMARY KEY ("id"))');
    }
    async down(queryRunner) {
        await queryRunner.query('DROP TABLE "will_read"');
    }
}
exports.CreateTableWillRead1657228188546 = CreateTableWillRead1657228188546;
//# sourceMappingURL=1657228188546-Create_table_will_read.js.map