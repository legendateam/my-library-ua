"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateColumnInBooksTable1663340037439 = void 0;
class CreateColumnInBooksTable1663340037439 {
    constructor() {
        this.name = 'CreateColumnInBooksTable1663340037439';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "books" ADD "age" integer`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "age"`);
    }
}
exports.CreateColumnInBooksTable1663340037439 = CreateColumnInBooksTable1663340037439;
//# sourceMappingURL=1663340037439-Create-Column-In-Books-Table.js.map