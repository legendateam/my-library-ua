"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropColumnBookIdTableWillRead1665587851962 = void 0;
class DropColumnBookIdTableWillRead1665587851962 {
    constructor() {
        this.name = 'DropColumnBookIdTableWillRead1665587851962';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "will_read" DROP COLUMN "bookId"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "will_read" ADD "bookId" integer NOT NULL`);
    }
}
exports.DropColumnBookIdTableWillRead1665587851962 = DropColumnBookIdTableWillRead1665587851962;
//# sourceMappingURL=1665587851962-Drop-Column-BookId-Table-WillRead.js.map