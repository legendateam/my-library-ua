"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeTypesColumnRateTableRatings1665826698768 = void 0;
class ChangeTypesColumnRateTableRatings1665826698768 {
    constructor() {
        this.name = 'ChangeTypesColumnRateTableRatings1665826698768';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "ratings" DROP COLUMN "rate"`);
        await queryRunner.query(`ALTER TABLE "ratings" ADD "rate" double precision NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "ratings" DROP COLUMN "rate"`);
        await queryRunner.query(`ALTER TABLE "ratings" ADD "rate" integer NOT NULL`);
    }
}
exports.ChangeTypesColumnRateTableRatings1665826698768 = ChangeTypesColumnRateTableRatings1665826698768;
//# sourceMappingURL=1665826698768-Change-Types-Column-Rate-Table-Ratings.js.map