"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateYearColumnInBooksTable1663340189719 = void 0;
class UpdateYearColumnInBooksTable1663340189719 {
    constructor() {
        this.name = 'UpdateYearColumnInBooksTable1663340189719';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "books" RENAME COLUMN "age" TO "yearOfRelease"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "books" RENAME COLUMN "yearOfRelease" TO "age"`);
    }
}
exports.UpdateYearColumnInBooksTable1663340189719 = UpdateYearColumnInBooksTable1663340189719;
//# sourceMappingURL=1663340189719-Update-Year-Column-In-Books-Table.js.map