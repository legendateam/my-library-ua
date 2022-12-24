"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateColumnFileTextTableBooksNullableTrue1663414775452 = void 0;
class UpdateColumnFileTextTableBooksNullableTrue1663414775452 {
    constructor() {
        this.name = 'UpdateColumnFileTextTableBooksNullableTrue1663414775452';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "books" ALTER COLUMN "fileText" DROP NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "books" ALTER COLUMN "fileText" SET NOT NULL`);
    }
}
exports.UpdateColumnFileTextTableBooksNullableTrue1663414775452 = UpdateColumnFileTextTableBooksNullableTrue1663414775452;
//# sourceMappingURL=1663414775452-Update-Column-FileText-Table-Books-Nullable-True.js.map