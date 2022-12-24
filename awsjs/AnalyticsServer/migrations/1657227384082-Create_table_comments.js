"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableComments1657227384082 = void 0;
class CreateTableComments1657227384082 {
    constructor() {
        this.name = 'CreateTableComments1657227384082';
    }
    async up(queryRunner) {
        await queryRunner.query('CREATE TABLE "comments" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT \'2022-07-07T20:56:28Z\', "deletedAt" TIMESTAMP, "userId" integer NOT NULL, "bookId" integer NOT NULL, "text" text NOT NULL, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))');
    }
    async down(queryRunner) {
        await queryRunner.query('DROP TABLE "comments"');
    }
}
exports.CreateTableComments1657227384082 = CreateTableComments1657227384082;
//# sourceMappingURL=1657227384082-Create_table_comments.js.map