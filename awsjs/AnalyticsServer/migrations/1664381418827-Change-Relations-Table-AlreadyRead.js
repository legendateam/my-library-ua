"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeRelationsTableFavorites1664381418827 = void 0;
class ChangeRelationsTableFavorites1664381418827 {
    constructor() {
        this.name = 'ChangeRelationsTableFavorites1664381418827';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "already_read" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" integer NOT NULL, "bookId" integer NOT NULL, CONSTRAINT "PK_3cdd19a56f8f67df0bcb7908ce8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "already_read" ADD CONSTRAINT "FK_a6268de85bcc2e76cccc01ebe9a" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "already_read" ADD CONSTRAINT "FK_358272d5f5f10e1aaed7bf4d0c1" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "already_read" DROP CONSTRAINT "FK_358272d5f5f10e1aaed7bf4d0c1"`);
        await queryRunner.query(`ALTER TABLE "already_read" DROP CONSTRAINT "FK_a6268de85bcc2e76cccc01ebe9a"`);
        await queryRunner.query(`DROP TABLE "already_read"`);
    }
}
exports.ChangeRelationsTableFavorites1664381418827 = ChangeRelationsTableFavorites1664381418827;
//# sourceMappingURL=1664381418827-Change-Relations-Table-AlreadyRead.js.map